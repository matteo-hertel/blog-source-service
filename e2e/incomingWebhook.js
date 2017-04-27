const {process} = require(`${__dirname}/../endpoints/gitPr.js`);
const mockPayload = require(`${__dirname}/../mocks/webhooks/mergedPR.json`);

process({body: JSON.stringify(mockPayload)}, null, null)
