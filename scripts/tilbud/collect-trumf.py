#!/usr/bin/env python3
"""Read only public Trumf pages. Produces a candidate, never edits published data.
Pagination is the same /category/paged route used by the site's public JS.
No login, click-through tracking, private APIs or access-control workarounds.
"""
import argparse, concurrent.futures, datetime, hashlib, html, json, re, time, urllib.request, urllib.parse, urllib.robotparser
from html.parser import HTMLParser
from pathlib import Path
BASE = 'https://trumfnetthandel.no'
class Node:
    def __init__(self, tag='', attrs=()): self.tag=tag; self.attrs=dict(attrs); self.children=[]
    def text(self): return ' '.join(c.text() if isinstance(c,Node) else c for c in self.children)
    def find(self, cls):
        result=[]
        if cls in self.attrs.get('class','').split(): result.append(self)
        for c in self.children:
            if isinstance(c,Node): result.extend(c.find(cls))
        return result
class DOM(HTMLParser):
    def __init__(self,s):
        super().__init__();self.root=Node();self.stack=[self.root];self.feed(s)
    def handle_starttag(self,t,a):
        n=Node(t,a);self.stack[-1].children.append(n)
        if t not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']: self.stack.append(n)
    def handle_endtag(self,t):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==t:self.stack=self.stack[:i];break
    def handle_data(self,s): self.stack[-1].children.append(s)
def clean(s):return re.sub(r'\s+',' ',s).strip()
def read(url):
    with urllib.request.urlopen(url,timeout=35) as r: return r.read().decode('utf-8')
def tiles(s):
    return [{'partner':html.unescape(n.attrs['data-name']),'sourceUrl':BASE+n.attrs['href'],'headline':clean(n.attrs.get('data-percentage','')),'upTo':'Opptil' in n.text()} for n in DOM(s).root.find('merchanttile')]
def catalogue(category='all'):
    rows=[];seen=set()
    for page in range(40):
        url=f'{BASE}/category/paged/{urllib.parse.quote(category)}/30/{page}/name'
        batch=tiles(read(url))
        if not batch:return rows
        for r in batch:
            if r['sourceUrl'] in seen:raise ValueError('Repeated page: refuse incomplete catalogue')
            seen.add(r['sourceUrl']);rows.append(r)
        if len(batch)<30:return rows
        time.sleep(.15)
    raise ValueError('Pagination exceeded limit')
def detail(row):
    try:
        s=read(row['sourceUrl']);d=DOM(s).root
        titles=d.find('merchant-list-offer-title');values=d.find('merchant-list-offer-value')
        if len(titles)!=len(values) or not titles:raise ValueError('No matching rate rows')
        rates=[]
        for title,value in zip(titles,values):
            full=clean(value.text()); deleted=value.find('strike')+value.find('old-rate')
            # Preserve captions and raw rate text for review; do not infer campaign dates.
            rates.append({'label':clean(title.text()),'text':full})
        row.update(rates=rates,restrictions=[clean(x.text()) for x in d.find('merchant-list-offer-detail')],checkedAt=datetime.date.today().isoformat(),evidenceSha256=hashlib.sha256(s.encode()).hexdigest(),reviewRequired=any(len(re.findall(r'\d+(?:[,.]\d+)?\s*%',r['text']))>1 for r in rates) or bool(re.search(r'kampanje|til og med|utløp|ordinær', ' '.join(r['text']+' '+r['label'] for r in rates), re.I)))
    except Exception as e: row.update(error=str(e),reviewRequired=True)
    return row
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--output',required=True);args=ap.parse_args()
    robots=urllib.robotparser.RobotFileParser();robots.parse(read(BASE+'/robots.txt').splitlines())
    if not robots.can_fetch('PengerIFokusCatalogueReview',BASE+'/category/paged/all/30/0/name'):raise RuntimeError('Robots restrictions changed; manual review required')
    rows=catalogue();print('Discovered',len(rows),'Trumf stores',flush=True)
    cats={}
    for slug,label in [('reise','Reise'),('mote','Mote'),('sport','Sport'),('elektronikk','Elektronikk'),('bolig','Hus og hjem'),('velvære','Helse'),('underholdning','Underholdning'),('barn','Barn'),('dyr','Dyretilbehør'),('tjenester','Tjenester')]:
        for r in catalogue(slug):cats[r['sourceUrl']]=label
    for r in rows:r['category']=cats.get(r['sourceUrl'],'Netthandel')
    with concurrent.futures.ThreadPoolExecutor(4) as ex: rows=list(ex.map(detail,rows))
    result={'source':BASE+'/kategori','checkedAt':datetime.date.today().isoformat(),'complete':True,'stores':rows}
    Path(args.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print('Saved',len(rows),'stores; errors',sum('error'in x for x in rows),'review',sum(x['reviewRequired'] for x in rows),flush=True)
