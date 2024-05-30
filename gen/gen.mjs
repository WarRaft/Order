import fs from 'fs'
import {hidden, named} from './data.mjs'
import {rmDir} from './rmdir.mjs'
import path from 'path'

const src = path.join('..', 'src')

const vjass = path.join(src, 'Order.j')
const zinc = path.join(src, 'Order.zn')
const zincO2S = path.join(src, 'Order2S.zn')
const lua = path.join(src, 'Order.lua')

const hiddenHeader = 'Hidden orders'
const namedHeader = 'Named orders'

rmDir(src)
if (!fs.existsSync(src)) fs.mkdirSync(src, {recursive: true, mode: '0777'})

fs.writeFileSync(vjass, `globals\n\n\t// ${hiddenHeader}\n`, {flag: 'w+'})
fs.writeFileSync(zinc, `library OrderId {\n\tpublic {\n\n\t\t// ${hiddenHeader}\n`, {flag: 'w+'})
fs.writeFileSync(zincO2S, 'library OrderId2Name {\n\tpublic function OrderId2Name(integer id) -> string {\n', {flag: 'w+'})
fs.writeFileSync(lua, `-- ${hiddenHeader}\n`, {flag: 'w+'})

/** @param {Object.<string, number>} orders */
const f = orders => {
    for (const [num, v] of Object.entries(orders)) {
        const hex = v.toString(16)
        fs.writeFileSync(vjass, `\tconstant integer Order_${num} = $${hex}\n`, {flag: 'a+'})
        fs.writeFileSync(zinc, `\t\tconstant integer Order_${num} = ${v};\n`, {flag: 'a+'})
        fs.writeFileSync(zincO2S, `\t\tif (id == ${v}) return "${num}";\n`, {flag: 'a+'})
        fs.writeFileSync(lua, `Order_${num} = 0x${hex};\n`, {flag: 'a+'})
    }
}

f(hidden)

fs.writeFileSync(vjass, `\n\t// ${namedHeader}\n`, {flag: 'a+'})
fs.writeFileSync(zinc, `\n\t\t// ${namedHeader}\n`, {flag: 'a+'})
fs.writeFileSync(lua, `\n-- ${namedHeader}\n`, {flag: 'a+'})

f(named)

fs.writeFileSync(vjass, 'endglobals', {flag: 'a+'})
fs.writeFileSync(zinc, '\t}\n}', {flag: 'a+'})
fs.writeFileSync(zincO2S, '\t\treturn I2S(id);\n\t}\n}', {flag: 'a+'})
