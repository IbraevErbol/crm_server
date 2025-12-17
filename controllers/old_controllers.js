// Больше не работает
import ItemService from "../services/services.js"

export const createItem = (req, res) => {
    const item = ItemService.create(req.body);
    res.json(item);
}

export const getAllItems = (req, res) => {
    const allItems = ItemService.getAllItems();
    
    if(!allItems || allItems.length === 0){ 
        return res.status(404).json({message: "The data is empty!"})
    }
    res.json(allItems);
}

export const deleteAllItems = (req, res) => {
    const cleared = ItemService.delAllItems();
    res.json({ message: "All items deleted", items: cleared });
};

export const findItem = (req, res) => {
    const item = ItemService.findItem(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
}

export const deleteItemById = (req, res) => {
    const removed = ItemService.findItemAndDel(req.params.id);
    if(!removed) return res.status(404).json({message: "Item not found!"});
    res.json({message: "Item deleted", removed})
}