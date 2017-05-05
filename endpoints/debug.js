require('dotenv').config({path: `${__dirname}/../.env`});

module.exports.process = (e, context, callback) => {
    const body = JSON.parse(e.body);
    console.log(JSON.stringify(body, null, 4));
    callback(null, {
        statusCode:200,
        body : JSON.stringify({
            process : "completed"
        })
    });
};
