import orders from "./orders.mjs";
import fs from "fs";

const vjass = 'OrderId.j';
const zinc = 'OrderId.zn';
const lua = 'OrderId.lua';

fs.writeFileSync(vjass, `globals\n`, {flag: 'w+'});
fs.writeFileSync(zinc, `library OrderId\n\tpublic {\n`, {flag: 'w+'});
fs.writeFileSync(lua, ``, {flag: 'w+'});

for (const [k, v] of Object.entries(orders)) {
    const hex = v.toString(16);
    fs.writeFileSync(vjass, `\tconstant integer Order_${k} = $${hex}\n`, {flag: 'a+'});
    fs.writeFileSync(zinc, `\t\tconstant integer Order_${k} = $${hex};\n`, {flag: 'a+'});
    fs.writeFileSync(lua, `Order_${k} = 0x${hex};\n`, {flag: 'a+'});
}

fs.writeFileSync(vjass, `endglobals`, {flag: 'a+'});
fs.writeFileSync(zinc, `\t}\n}`, {flag: 'a+'});