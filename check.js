import ordersU from "./orders-u.mjs";
import {ordersNamed} from "./orders.mjs";
import {ordersGui} from "./gui.mjs";

const map = new Map();

if (0) {
    for (const [k, v] of Object.entries(ordersU)) {
        if (map.has(v)) {
            console.log('Catcha', k, v);
        }
        map.set(v, 1);
    }
}

for (const [k, v] of Object.entries(ordersGui)) {
    //console.log(k, ordersNamed[k], k === ordersNamed[k]);
    if (!ordersNamed[k]) {
        console.log(k);
    }
    //console.log(ordersU[k], v);
}