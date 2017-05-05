require('dotenv').config({
    path: `${__dirname}/../.env`
});
const blog = require(`${__dirname}/../modules/blog`);

module.exports.process = (e, context, callback) => {
    const body = JSON.parse(e.body);

    return blog.processIncomingData(body)
    .then(data => {
        console.log(data);
        return data;
    })
    .catch((exc) => {
        console.log(exc);
    });
};