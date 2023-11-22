const fs = require('fs')
const {newOrder} = require('./handler')
const {reset_orders} = require("./src/track_orders");


test('Runs newOrder handler', async () => {
        let eventFile = fs.readFileSync('./src/test_assets/new_order_mock.json')
        let event = {
            body: eventFile
        };

        let response = null;

        const callback = (err, res) => {
            if (err) {
                console.error(err);
            }
            response = res;
        }

        await newOrder(event, null, callback);

        expect(response).toHaveProperty('statusCode');
        expect(response.statusCode).toBe(200);
    }
)

test('newOrder handler should fail when no body present', async () => {
        let eventFile = fs.readFileSync('./src/test_assets/event.json')
        let event = JSON.parse(eventFile);

        let response = null;

        const callback = (err, res) => {
            if (err) {
                console.error(err);
            }
            response = res;
        }

        await newOrder(event, null, callback);

        expect(response).toHaveProperty('statusCode');
        expect(response.statusCode).toBe(400);
    }
)

test('newOrder handler should not process duplicated order', async () => {
        let eventFile = fs.readFileSync('./src/test_assets/new_order_mock.json')
        let event = {
            body: eventFile
        };

        let response = null;

        const callback = (err, res) => {
            if (err) {
                console.error(err);
            }
            response = res;
        }

        reset_orders();
        await newOrder(event, null, callback);
        expect(response).toHaveProperty('statusCode');
        expect(response.statusCode).toBe(200);

        await newOrder(event, null, callback);
        expect(response).toHaveProperty('statusCode');
        expect(response.statusCode).toBe(409);
    }
)