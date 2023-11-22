const fs = require('fs')
const {proc_order} = require('./new_order')
const inventory = require("./inventory");

const mockedinventory = {"8197932187863": {quantity: 10}};

test('Proc_order should update inventory', async () => {
        let eventFile = fs.readFileSync('./src/test_assets/new_order_mock.json');
        let event = JSON.parse(eventFile);

        inventory.write_inventory(mockedinventory);
        let response = proc_order(event, null);

        expect(response).toHaveProperty('8197932187863');
        expect(response["8197932187863"]).toHaveProperty('quantity');
        expect(response["8197932187863"]['quantity']).toBe(9);
    }
)