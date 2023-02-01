/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
/**
 * Service Methods
 */
export declare const findAll: () => Promise<Item[]>;
export declare const find: (id: number) => Promise<Item>;
export declare const create: (newItem: BaseItem) => Promise<Item>;
export declare const update: (id: number, itemUpdate: BaseItem) => Promise<Item | null>;
export declare const remove: (id: number) => Promise<null | void>;
