import orders from "./orders.mjs";

const map = new Map();

for (const [k, v] of Object.entries(orders)) {
    if (map.has(v)) {
        console.log('Catcha', k, v);
    }
    map.set(v, 1);
}