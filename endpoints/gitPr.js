require('dotenv').config({
    path: `${__dirname}/../.env`
});
const webhook = require(`${__dirname}/../modules/git/webhook`);
const commit = require(`${__dirname}/../modules/git/commit`);
const co = require("co");
module.exports.process = (e, context, callback) => {
    const body = JSON.parse(e.body);

    co(function* () {
        const pr = yield webhook.acceptValidPRs(body);
        const {
            owner,
            name
        } = yield webhook.getRepoAndOwner(pr);
        const files = yield commit.getFilesFromCommitHash(owner, name, pr.number)
        
    }).catch((exc) => {
        console.log(exc);
    });
};