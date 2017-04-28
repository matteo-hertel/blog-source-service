require('dotenv').config({
    path: `${__dirname}/../.env`
});
const webhook = require(`${__dirname}/../modules/git/webhook`);
const commit = require(`${__dirname}/../modules/git/commit`);

module.exports.process = (e, context, callback) => {
    const body = JSON.parse(e.body);
    webhook.acceptValidPRs(body)
        .then(pr => {
            webhook
                .getRepoAndOwner(pr)
                .then((data) => {
                    commit.getFilesFromCommitHash(data.owner, data.name, pr.number)
                        .then()
                }).catch(exc => {
                    console.log(exc)
                });
        }).catch(exc => {
            console.log(exc)
        });


    // console.log(JSON.stringify(body, null, 4));
    // callback(null, {
    //     statusCode:200,
    //     body : JSON.stringify({
    //         process : "completed"
    //     })
    // });
};