const https = require('https');

https.get('https://api.github.com/repos/adeeb10abbas/shia-library-json/contents/db/duas', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const files = JSON.parse(data);
        const catalog = files.filter(f => f.name.endsWith('.json')).map(f => {
            const isZiyarat = f.name.includes('ziyarat') || f.name.includes('ziyrat');
            let id = f.name.replace('.json', '');
            let title = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return {
                id,
                title,
                description: isZiyarat ? 'Salutation.' : 'Supplication.',
                type: isZiyarat ? 'ziyarat' : 'dua',
                filename: f.name
            };
        });
        console.log(JSON.stringify(catalog, null, 2));
    });
});
