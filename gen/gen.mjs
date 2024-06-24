import fs from 'fs'
import {hidden, named} from './data.mjs'
import {rmDir} from './rmdir.mjs'
import path from 'path'

const src = path.join('..', 'src')

const as = path.join(src, 'Order.as')
const vjass = path.join(src, 'Order.j')
const zinc = path.join(src, 'Order.zn')
const lua = path.join(src, 'Order.lua')
const md = path.join(src, '..', 'README.md')

const hiddenHeader = 'Hidden orders'
const namedHeader = 'Named orders'

rmDir(src)
if (!fs.existsSync(src)) fs.mkdirSync(src, {recursive: true, mode: '0777'})

fs.writeFileSync(vjass, `globals\n\n\t// ${hiddenHeader}\n`, {flag: 'w+'})
fs.writeFileSync(zinc, `library Order {\n\tpublic {\n\n\t\t// ${hiddenHeader}\n`, {flag: 'w+'})
fs.writeFileSync(lua, `-- ${hiddenHeader}\n`, {flag: 'w+'})
fs.writeFileSync(as, `enum Order {\n\n\t//${hiddenHeader}\n`, {flag: 'w+'})

// https://nodejs.org/api/fs.html#file-system-flags

/** @param {Object.<string, number>} orders */
const f = orders => {
    const $vjass = []
    const $zinc = []
    const $lua = []
    const $as = []

    for (let i = 0; i < Object.entries(orders).length; i++) {
        const [name, int] = Object.entries(orders)[i]
        const hex = int.toString(16)
        $vjass.push(`\tconstant integer Order_${name} = $${hex} // ${int}`)
        $zinc.push(`\t\tconstant integer Order_${name} = ${int}; // 0x${hex}`)
        $lua.push(`Order_${name} = 0x${hex}; -- ${int}`)
        $as.push(`\t${name} = 0x${hex} /* ${int} */`)
    }

    fs.writeFileSync(vjass, $vjass.join('\n'), {flag: 'a+'})
    fs.writeFileSync(zinc, $zinc.join('\n'), {flag: 'a+'})
    fs.writeFileSync(lua, $lua.join('\n'), {flag: 'a+'})
    fs.writeFileSync(as, $as.join(',\n'), {flag: 'a+'})
}

f(hidden)

fs.writeFileSync(vjass, `\n\n\t// ${namedHeader}\n`, {flag: 'a+'})
fs.writeFileSync(zinc, `\n\n\t\t// ${namedHeader}\n`, {flag: 'a+'})
fs.writeFileSync(lua, `\n\n-- ${namedHeader}\n`, {flag: 'a+'})
fs.writeFileSync(as, `,\n\n\t// ${namedHeader}\n`, {flag: 'a+'})

f(named)

fs.writeFileSync(vjass, '\nendglobals', {flag: 'a+'})
fs.writeFileSync(zinc, '\n\t}\n}', {flag: 'a+'})
fs.writeFileSync(as, '\n}', {flag: 'a+'})


fs.writeFileSync(md, `# Order

List of order ID for Warcraft III.

- [AngelScript](#angelscript)
- [VJASS](#vjass)
- [ZINC](#zinc)
- [LUA](#lua)

`, {flag: 'w+'})


const mdBlock = (head, file, l) => fs.writeFileSync(md, `## ${head}
[Download](https://raw.githubusercontent.com/WarRaft/Order/master${file.replace('..', '')})
\`\`\`${l}
${fs.readFileSync(file)}
\`\`\`\n`, {flag: 'a+'})

mdBlock('AngelScript', as, 'C++')
mdBlock('VJASS', vjass, 'C++')
mdBlock('ZINC', zinc, 'C++')
mdBlock('Lua', lua, 'Lua')
