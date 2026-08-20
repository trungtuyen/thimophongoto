const fs = require('fs');
let content = fs.readFileSync('testref.js', 'utf8');

// Mock window and document
const prefix = `
const window = { location: { href: '' } };
const document = { getElementById: () => ({ addEventListener: () => {} }), querySelector: () => ({}), ready: () => {} };
const $ = () => ({ ready: () => {}, click: () => {} });
`;
fs.writeFileSync('testref_run.js', prefix + content + '\nconsole.log(urlvideos);');
