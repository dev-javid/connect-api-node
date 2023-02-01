"use strict";
/**
 * Required External Modules and Interfaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const ItemService = tslib_1.__importStar(require("./items.service"));
/**
 * Router Definition
 */
exports.itemsRouter = express_1.default.Router();
// GET items
exports.itemsRouter.get("/", async (req, res) => {
    try {
        const items = await ItemService.findAll();
        res.status(200).send(items);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
// GET items/:id
exports.itemsRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const item = await ItemService.find(id);
        if (item) {
            return res.status(200).send(item);
        }
        res.status(404).send("item not found");
    }
    catch (e) {
        res.status(500).send(e);
    }
});
// POST items
exports.itemsRouter.post("/", async (req, res) => {
    try {
        const item = req.body;
        const newItem = await ItemService.create(item);
        res.status(201).json(newItem);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
// PUT items/:id
exports.itemsRouter.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const itemUpdate = req.body;
        const existingItem = await ItemService.find(id);
        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }
        const newItem = await ItemService.create(itemUpdate);
        res.status(201).json(newItem);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
// DELETE items/:id
exports.itemsRouter.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await ItemService.remove(id);
        res.sendStatus(204);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
//# sourceMappingURL=items.router.js.map