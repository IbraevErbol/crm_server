//Не работает больше !!

import fs from "fs";
import path from "path";

// import {filePath} from "../data/items.json";
const filePath = path.resolve("data/items.json");

// Читаем файл или создаём пустой массив
function loadItems() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

let items = loadItems();

function saveItems() {
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}


function create(data){
    const newItem = { id: Date.now(), ...data };
    items.push(newItem);
    saveItems()
    return newItem;
}

function delAllItems(){
    items = [];
    saveItems();
    return [];
}

function getAllItems(){
    return items;
}

// пока будем искать по айди после может по имени тд
function findItem(id){
    return items.find(item => item.id === Number(id))
}

function findItemAndDel(id){
    const delItemId = items.findIndex(item => item.id === Number(id));
    if (delItemId === -1) return null;

    const removed = items.splice(delItemId, 1);
    saveItems();

    return removed[0];
}
export default {create, delAllItems, getAllItems, findItem, findItemAndDel};