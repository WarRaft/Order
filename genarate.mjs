import fs from "fs";
import {ordersHidden, ordersNamed} from "./orders.mjs";

const vjass = 'OrderId.j';
const zinc = 'OrderId.zn';
const zincOrderId2Name = 'OrderId2Name.zn';
const lua = 'OrderId.lua';

const hiddenHeader = 'Hidden orders';
const namedHeader = 'Named orders';

fs.writeFileSync(vjass, `globals\n\n\t// ${hiddenHeader}\n`, {flag: 'w+'});
fs.writeFileSync(zinc, `library OrderId {\n\tpublic {\n\n\t\t// ${hiddenHeader}\n`, {flag: 'w+'});
fs.writeFileSync(zincOrderId2Name, `library OrderId2Name {\n\tpublic function OrderId2Name(integer id) -> string {\n`, {flag: 'w+'});
fs.writeFileSync(lua, `-- ${hiddenHeader}\n`, {flag: 'w+'});

/** @param {Object.<string, number>} orders */
const f = orders => {
    for (const [k, v] of Object.entries(orders)) {
        const hex = v.toString(16);
        fs.writeFileSync(vjass, `\tconstant integer Order_${k} = $${hex}\n`, {flag: 'a+'});
        fs.writeFileSync(zinc, `\t\tconstant integer Order_${k} = ${v};\n`, {flag: 'a+'});
        fs.writeFileSync(zincOrderId2Name, `\t\tif (id == ${v}) return "${k}";\n`, {flag: 'a+'});
        fs.writeFileSync(lua, `Order_${k} = 0x${hex};\n`, {flag: 'a+'});
    }
}

f(ordersHidden);

fs.writeFileSync(vjass, `\n\t// ${namedHeader}\n`, {flag: 'a+'});
fs.writeFileSync(zinc, `\n\t\t// ${namedHeader}\n`, {flag: 'a+'});
fs.writeFileSync(lua, `\n-- ${namedHeader}\n`, {flag: 'a+'});

f(ordersNamed);


fs.writeFileSync(vjass, `endglobals`, {flag: 'a+'});
fs.writeFileSync(zinc, `\t}\n}`, {flag: 'a+'});
fs.writeFileSync(zincOrderId2Name, `\t\treturn I2S(id);\n\t}\n}`, {flag: 'a+'});