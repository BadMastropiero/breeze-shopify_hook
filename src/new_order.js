const inventory = require("./inventory");

module.exports.proc_order = (newOrder) => {
    console.log("New order created: ", newOrder);

    const lineItems = newOrder.line_items || [];
    const inventoryDatabase = inventory.read_inventory();

    // Calculate inventory changes based on lineItems
    const inventoryUpdates = {};
    lineItems.forEach((item) => {
        const productId = item.product_id;
        const quantitySold = item.quantity;
        const currentInventoryQ = inventoryDatabase[productId]?.quantity || 0;
        inventoryUpdates[productId] = {
            quantity: currentInventoryQ - quantitySold
        };
    });
    inventory.write_inventory(inventoryUpdates);

    console.log("New inventory generated: ", inventoryUpdates);

    return inventoryUpdates;
}