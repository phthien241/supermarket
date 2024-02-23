const fs = require('fs');
const filePath = './src/environment.prod.ts';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('placeholder-apiUrl', process.env.API_URL);
content = content.replace('placeholder-clientId', process.env.CLIENT_ID);
content = content.replace('placeholder-authority', process.env.AUTHORITY);
content = content.replace('placeholder-redirectUri', process.env.REDIRECT_URI);
content = content.replace('placeholder-knownAuthorities', process.env.KNOWN_AUTHORITIES);
content = content.replace('placeholder-scope', process.env.SCOPE);

fs.writeFileSync(filePath, content, 'utf8');

