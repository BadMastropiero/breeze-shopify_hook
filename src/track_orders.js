let orders = {
    processed: [],
    failed: [],
}

// Mock tracking of orders
module.exports.read_orders = () => {
    return orders;
}

module.exports.add_processed_order = (data) => {
    orders.processed.push(data);
    return orders;
}

module.exports.add_failed_order = (data) => {
    orders.failed.push(data);
    return orders;
}

module.exports.reset_orders = () => {
    orders = {
        processed: [],
        failed: [],
    };
    return orders;
}

module.exports.remove_failed_order = (data) => {
    orders.failed = orders.failed.filter((order) => {
        return order.id !== data.id;
    });
    return orders;
}