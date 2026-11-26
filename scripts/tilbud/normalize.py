"""Normalize public catalogue facts into reviewable candidates, without publication."""
import json,re,sys,unicodedata
from pathlib import Path

def key(s):
    s=unicodedata.normalize('NFD',s.lower()).replace('ø','o').replace('æ','ae')
    s=re.sub(r'\.(no|com|se|dk)$','',s)
    s=re.sub('[^a-z0-9]','',s)
    return {'scandichotels':'scandic','radissonhotels':'radisson','legoshop':'lego','dbjourney':'db','feverlabsinc':'fever','kjellogcompany':'kjellcompany','kjellandcompany':'kjellcompany','nortonbysymantec':'norton','thebodyshop':'bodyshop','empshop':'emp','tripcom':'trip'}.get(s,s)
def audience(label):
    s=label.lower()
    if re.search(r'new customer|ny kunde|nye kund',s):return 'new'
    if re.search(r'existing|eksisterende|tilbakevendende',s):return 'existing'
    return 'all'
def label_rates(rates,channel):
    def fmt(x):return f'{x:g}'.replace('.',',')
    chunks=[]
    for unit in ['percent','points-per-100','fixed-kr','fixed-points']:
        v=[r['value'] for r in rates if r['unit']==unit]
        if not v:continue
        lo,hi=min(v),max(v);s=fmt(lo) if lo==hi else fmt(lo)+'–'+fmt(hi)
        chunks.append(s+({'percent':' %','points-per-100':' poeng / 100 kr','fixed-kr':' kr per kjøp','fixed-points':' poeng per kjøp'}[unit]))
    return ' / '.join(chunks) or 'Sjekk sats hos programmet'
def trumf(raw):
    out=[]
    for r in raw['stores']:
        rates=[]
        for t in r.get('rates',[]):
            m=re.fullmatch(r'\s*(\d+(?:[,.]\d+)?)\s*(%|kr)\s*',t['text'])
            if not m:raise ValueError('Unknown Trumf rate '+str(t))
            rates.append(dict(label=t['label'],value=float(m[1].replace(',','.')),unit='percent' if m[2]=='%' else 'fixed-kr',audience=audience(t['label']),kind='listed'))
        out.append(dict(partner=r['partner'],program='trumf',category=r['category'],sourceUrl=r['sourceUrl'],offerLabel=label_rates(rates,'trumf-netthandel'),terms='Start med tom handlekurv via Trumf Netthandel. Bonus beregnes uten mva, frakt, toll og gebyrer. Rabattkoder, gavekort, klikk og hent og konkurrerende portaler kan bryte vilkårene. '+ ' '.join(r.get('restrictions',[])),shopping=dict(channel='trumf-netthandel',verification='needs-review' if r.get('error') or r.get('reviewRequired') else 'verified',checkedAt=r.get('checkedAt'),attemptedAt=raw['checkedAt'],sourceKind='official',rates=rates,basis='ex-vat')))
    return out
def klarna(raw):
    cats={'health_beauty':'Helse','fashion':'Mote','home_garden':'Hus og hjem','electronics':'Elektronikk','sports_outdoors':'Sport','travel':'Reise','entertainment':'Underholdning','automotive':'Bil','kids_family':'Barn','pets':'Dyretilbehør'}
    # Support collector's original public SSR shape as well as reviewed research snapshots.
    rows=raw.get('items')
    if rows is None:
        rows=[]
        for s in raw['stores']:
            d=s.get('cashbackDiscount')
            if not d:raise ValueError('Missing cashbackDiscount')
            rows.append(dict(name=s['displayName'],sourceUrl='https://www.klarna.com'+s['storeUrl'] if s.get('storeUrl') else s['listSourceUrl'],rate=d['discountPercentage']/100,ordinaryRate=d.get('oldDiscountPercentage'),previousRate=d.get('oldDiscountPercentage')/100 if d.get('oldDiscountPercentage') is not None else None,campaignRate=d['discountPercentage']/100 if d.get('oldDiscountPercentage') is not None else None,campaignEndsAt=d.get('endedAt'),category=s.get('category'),conditions=d.get('conditions') or {}))
    out=[]
    for r in rows:
        rates=[]
        campaign=r.get('campaignRate') is not None
        for t in r['conditions'].get('cashbackRates') or [dict(value=r['rate']*100,type='percentage',name='Publisert sats')]:
            if t['type']!='percentage':raise ValueError('Unknown Klarna unit '+str(t))
            rate=dict(label={'Default':'Hele nettbutikken','New customer':'Ny kunde','Existing customer':'Eksisterende kunde'}.get(t['name'],t['name']),value=t['value']/100,unit='percent',audience=audience(t['name']),kind='campaign' if campaign else 'listed')
            if r.get('campaignEndsAt'):rate['endsAt']=r['campaignEndsAt']
            if campaign and r.get('previousRate') is not None:rate['regularValue']=r['previousRate']
            rates.append(rate)
        exclusions=r['conditions'].get('exclusionsStructured',[])
        terms='Start handelen i Klarna-appen og betal med Klarna. Offentlig sats uten innloggede medlemsfordeler. Cashback gis som poeng; Klarna-bankkonto kreves for utbetaling. Standard-poeng utløper etter 6 måneder. '
        if exclusions:terms+='Unntak hos kilden: '+', '.join(exclusions)+'. '
        if r['conditions'].get('lockingPeriod'):terms+='Oppgitt godkjenningsperiode: '+str(r['conditions']['lockingPeriod'])+' dager. '
        if campaign:terms+='Tidligere vist sats er ikke bekreftet som sats etter kampanjen. '
        out.append(dict(partner=r['name'],program='klarna',category=cats.get(r['category'],'Netthandel'),sourceUrl=r['sourceUrl'],offerLabel=label_rates(rates,'klarna'),terms=terms,shopping=dict(channel='klarna',verification='verified',checkedAt=raw['checkedAt'][:10],attemptedAt=raw['checkedAt'][:10],sourceKind='official',rates=rates,basis='unknown')))
    return out
if __name__=='__main__':
    program,source,target=sys.argv[1:];raw=json.loads(Path(source).read_text());rows=globals()[program](raw)
    Path(target).write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n');print(program,len(rows))
