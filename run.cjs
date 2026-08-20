const fs = require('fs');
let content = fs.readFileSync('testref.js', 'utf8');

const prefix = `
const window = { location: { href: '' } };
const document = { getElementById: () => ({ addEventListener: () => {} }), querySelector: () => ({}), ready: () => {} };
const $ = function() { return { ready: () => {}, click: () => {} }; };
`;
fs.writeFileSync('testref_run.cjs', prefix + content + '\nconsole.log("URLVIDEOS: " + urlvideos);');
