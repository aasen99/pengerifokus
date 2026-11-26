"""Read Klarna's public NO cashback SSR catalogue. No auth or private API.
Writes a candidate snapshot only; reviewer must check changes before publishing.
Usage: python klarna-catalogue-fetch.py /tmp/klarna-candidate.json
"""
import concurrent.futures, datetime, json, math, re, sys, urllib.request, urllib.robotparser
BASE = 'https://www.klarna.com'
LIST = BASE + '/no/store/?type=CASHBACK'

def fetch_page(page):
    url = LIST + ('&page=' + str(page) if page > 1 else '')
    with urllib.request.urlopen(url, timeout=40) as response:
        if response.status != 200:
            raise RuntimeError(f'Unexpected HTTP {response.status}: {url}')
        html = response.read().decode('utf-8')
    scripts = re.findall(r'<script[^>]*type="application/[^>]*>(.*?)</script>', html, re.S)
    for script in scripts:
        data = json.loads(script)
        for query in data.get('__DEHYDRATED_QUERY_STATE__', {}).get('queries', []):
            if 'STORE_DIRECTORY_LISTING' in query.get('queryKey', []):
                result = query['state']['data']['pages']
                if len(result) != 1:
                    raise RuntimeError('Unexpected pagination schema; manual review required')
                return {'page': page, 'sourceUrl': url, 'data': result[0]}
    raise RuntimeError('No public STORE_DIRECTORY_LISTING data; manual review required')

robots = urllib.robotparser.RobotFileParser(BASE + '/robots.txt')
robots.read()
if not robots.can_fetch('PengerIFokusCatalogueReview', LIST):
    raise RuntimeError('Robots restrictions changed; manual review required')
first = fetch_page(1)
total = first['data']['totalHits']
size = len(first['data']['stores'])
if not isinstance(total, int) or not size or total < size or total > 2000:
    raise RuntimeError('Unexpected catalogue size; manual review required')
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    pages = [first, *executor.map(fetch_page, range(2, math.ceil(total / size) + 1))]
stores = {}
for page in pages:
    if page['data']['totalHits'] != total:
        raise RuntimeError('Catalogue changed during collection; manual review required')
    for store in page['data']['stores']:
        if store['storeKrn'] in stores:
            raise RuntimeError('Duplicate store; manual review required')
        stores[store['storeKrn']] = {'listSourceUrl': page['sourceUrl'], **store}
if len(stores) != total:
    raise RuntimeError(f'Incomplete catalogue: {len(stores)}/{total}; manual review required')
snapshot = {'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'sourceUrl': LIST,
            'completePublicCatalogue': True, 'totalHits': total, 'stores': list(stores.values())}
with open(sys.argv[1], 'w', encoding='utf-8') as output:
    json.dump(snapshot, output, ensure_ascii=False, indent=2)
print(json.dumps({'count': total, 'output': sys.argv[1]}))
