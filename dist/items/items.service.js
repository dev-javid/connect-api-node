"use strict";
// src/items/items.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
/**
 * In-Memory Store
 */
let items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};
/**
 * Service Methods
 */
const findAll = async () => Object.values(items);
exports.findAll = findAll;
const find = async (id) => items[id];
exports.find = find;
const create = async (newItem) => {
    const id = new Date().valueOf();
    items[id] = Object.assign({ id }, newItem);
    return items[id];
};
exports.create = create;
const update = async (id, itemUpdate) => {
    const item = await (0, exports.find)(id);
    if (!item) {
        return null;
    }
    items[id] = Object.assign({ id }, itemUpdate);
    return items[id];
};
exports.update = update;
const remove = async (id) => {
    const item = await (0, exports.find)(id);
    if (!item) {
        return null;
    }
    delete items[id];
};
exports.remove = remove;
//# sourceMappingURL=items.service.js.map