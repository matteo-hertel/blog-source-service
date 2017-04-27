require('dotenv').config({path: `${__dirname}/../.env`});
const webhook = require(`${__dirname}/../modules/git/webhook`);

module.exports.process = (e, context, callback) => {
    const body = JSON.parse(e.body);
    webhook.acceptValidPRs(body).then(data => {
        console.log(data);
    });
    // console.log(JSON.stringify(body, null, 4));
    // callback(null, {
    //     statusCode:200,
    //     body : JSON.stringify({
    //         process : "completed"
    //     })
    // });
};

