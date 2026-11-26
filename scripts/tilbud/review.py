"""Compare freshly collected public facts with published snapshots. No writes to site data."""
import datetime,json,sys
from pathlib import Path
from normalize import key
published=json.loads(Path(sys.argv[1]).read_text());candidates=[]
for p in sys.argv[2:]:candidates.extend(json.loads(Path(p).read_text()))
def index(rows):
 d={}
 for r in rows:
  k=r['shopping']['channel']+':'+key(r['partner'])
  if k in d:raise ValueError('Duplicate candidate '+k)
  d[k]=r
 return d
old=index(published);new=index(candidates);channels={r['shopping']['channel'] for r in candidates};changes=[]
for k,r in new.items():
 if k not in old:changes.append(dict(type='new',key=k,candidate=r))
 elif any(old[k].get(f)!=r.get(f) for f in ['offerLabel','terms','sourceUrl','category']) or old[k]['shopping']['rates']!=r['shopping']['rates']:changes.append(dict(type='changed',key=k,before=old[k],candidate=r))
for k,r in old.items():
 if r['shopping']['channel'] in channels and k not in new:changes.append(dict(type='missing-needs-manual-review',key=k,before=r))
now=datetime.datetime.now(datetime.timezone.utc)
for k,r in old.items():
 for rate in r['shopping']['rates']:
  if rate.get('endsAt') and datetime.datetime.fromisoformat(rate['endsAt'].replace('Z','+00:00'))<now:changes.append(dict(type='expired-needs-recheck',key=k,rate=rate))
result=dict(checkedAt=now.isoformat(),automaticPublication=False,manualSources=['SAS Online Shopping (public listing error / API denied)','Spenn (app-only catalogue)','Amex acceptance (merchant/channel evidence)'],changes=changes)
Path('/tmp/tilbud-changes.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
summary='\n'.join(f"- {kind}: {sum(c['type']==kind for c in changes)}" for kind in sorted({c['type'] for c in changes}))
Path('/tmp/tilbud-review.md').write_text('# Netthandel: kontrollrapport\n\n'+now.isoformat()+'\n\n'+summary+'\n\nKandidater krever redaksjonell kontroll. Ingen publisering eller automatisk fjerning er utført.\n')
print(summary or 'No catalogue changes')
