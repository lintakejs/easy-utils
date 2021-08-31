const fs = require('fs-extra');
const path = require('path');

const aliasRoot = [
  'filters', 'regs'
]

aliasRoot.map(alias => path.resolve(__dirname, `../${alias}`)).forEach(alias => {
  if (fs.existsSync(alias)) {
    fs.removeSync(alias)
  }
  fs.ensureDirSync(alias)
})

aliasRoot.forEach(alias => {
  const pkgManifest = {
    "name": `@zto-plugin/${alias}`,
    "types": `../lib/types/${alias}/index.d.ts`,
    "main": `../lib/cjs/${alias}/index.js`,
    "module": `../lib/esm5/${alias}/index.js`,
    "es2015": `../lib/esm/${alias}/index.js`,
    "sideEffects": false
  }

  fs.writeJSON(path.resolve(__dirname, `../${alias}/package.json`), pkgManifest, { spaces: 2 });
})