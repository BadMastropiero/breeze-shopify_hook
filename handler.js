'use strict';

const {proc_order} = require("./src/new_order");
const {read_orders, add_processed_order, add_failed_order, remove_failed_order} = require("./src/track_orders");

module.exports.newOrder = async (event, context, callback) => {
    let webhookData;
    let response = {
        statusCode: 204,
    };

    try {
        webhookData = JSON.parse(event.body);
    } catch (error) {
        console.error('Error parsing webhook data:', error);
        response = {
            statusCode: 400,
            body: 'Invalid request.',
        };
        callback(null, response);
        return;
    }

    const orderId = webhookData.id;
    if (read_orders().processed.includes(orderId)) {
        console.log("Order already processed: ", orderId);
        response = {
            statusCode: 409,
            body: 'Already processed.',
        };
        callback(null, response);
        return;
    }

    try {
        const inventoryUpdates = proc_order(webhookData);
        add_processed_order(orderId);
        remove_failed_order(orderId);
        response = {
            statusCode: 200,
            body: JSON.stringify({
                new_inventory: inventoryUpdates,
            }),
        };
    } catch (error) {
        console.error('Error processing webhook:', error);
        add_failed_order(orderId);
        response = {
            statusCode: 500,
            body: 'Error processing webhook.',
        };
        callback(null, response);
        return;
    }

    callback(null, response);
};
