
export const productRows = [
    {"code" : 'BS_5LB', "name" : "Blacksmith", "category" : "5 lb"},
    {"code" : 'EM_5LB', "name" : "Embers", "category" : "5 lb"},
    {"code" : 'O_5LB', "name" : "Espressomatica", "category" : "5 lb"},
    {"code" : 'OS_5LB', "name" : "Old School", "category" : "5 lb"},
    {"code" : 'IR_5LB', "name" : "Italian Roast", "category" : "5 lb"},
    {"code" : 'DCF_5LB', "name" : "Decaf", "category" : "5 lb"},
    {"code" : 'BS_10OZ', "name" : "Blacksmith", "category" : "10 oz"},
    {"code" : 'EM_10OZ', "name" : "Embers", "category" : "10 oz"},
    {"code" : 'O_10OZ', "name" : "Espressomatica", "category" : "10 oz"},
    {"code" : 'OS_10OZ', "name" : "Old School", "category" : "10 oz"},
    {"code" : 'IR_10OZ', "name" : "Italian Roast", "category" : "10 oz"},
    {"code" : 'MJ_10OZ', "name" : "Mocha Java", "category" : "10 oz"},
    {"code" : 'DCF_1LB', "name" : "Decaf", "category" : "1 lb"},
    {"code" : 'AS', "name" : "Angel's Share", "category" : "barrel aged"},
    {"code" : 'MS', "name" : "Moonshine", "category" : "barrel aged"},
    {"code" : 'DC', "name" : "Devil's Cut", "category" : "barrel aged"},
    {"code" : 'BAMJ', "name" : "Mocha Java", "category" : "barrel aged"},
    {"code" : 'CL_KEG', "name" : "Classic Keg", "category" : "nitro keg"},
    {"code" : 'WBC_KEG', "name" : "WBC Keg", "category" : "nitro keg"},
    {"code" : 'S_KEG', "name" : "Flavor Keg", "category" : "nitro keg"},
]
export const productCategories = ["5 lb", "10 oz", "1 lb", "barrel aged", "nitro keg"];

export const formatDate = (date) => {
    if (date == undefined) return;
    let month = date.getMonth() + 1;
    month = month.toString()
    return [date.getFullYear(), month.padStart(2, '0'), date.getDate().toString().padStart(2, '0')].toString().replaceAll(',','-')
}

export const filterByDateRange = (array, start, end) => {
    return array.filter(e => new Date(e.date) >= new Date(formatDate(start)) && new Date(e.date) <= new Date(formatDate(end)))
}

export const buildAccumulator = (array, specifier) => {
    let theAccumulator = new Object();
    array.map(e => theAccumulator[e[specifier]] = 0);
    return theAccumulator;
}