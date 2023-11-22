let inventory = {}

// Mock inventory database
module.exports.read_inventory = () => {
    return inventory;
}

module.exports.write_inventory = (data) => {
    inventory = data;
    return inventory;
}