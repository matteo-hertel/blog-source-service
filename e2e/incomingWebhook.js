const {process} = require(`${__dirname}/../endpoints/webhook.js`);
const mockPayload = require(`${__dirname}/../mocks/webhooks/mergedPR.json`);

let stuff = process({body: JSON.stringify(mockPayload)}, null, null)
stuff.then(data => { console.log(data);})