import urllib.request
import json
import re

url = 'https://api.github.com/repos/adeeb10abbas/shia-library-json/contents/db/duas'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

catalog = []
for f in data:
    if f['name'].endswith('.json'):
        is_ziyarat = 'ziyarat' in f['name'] or 'ziyrat' in f['name']
        id = f['name'].replace('.json', '')
        title = ' '.join(word.capitalize() for word in id.split('-'))
        catalog.append({
            'id': id,
            'title': title,
            'description': 'Salutation.' if is_ziyarat else 'Supplication.',
            'type': 'ziyarat' if is_ziyarat else 'dua',
            'filename': f['name']
        })

print(json.dumps(catalog, indent=2))
