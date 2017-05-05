require('dotenv').config({
    path: `${__dirname}/../.env`
});

const git = require(`${__dirname}/git/fs`);
const markdown = require(`${__dirname}/markDownProcessor`);
const webhook = require(`${__dirname}/git/webhook`);
const commit = require(`${__dirname}/git/commit`);
const moment = require("moment");
const co = require("co");

const storablePayload = {
    name: "",
    seo: "",
    body: "",
    meta: {},
    createdDate: "",
    updatedDate: ""
};

function getStorable(author, repo, branch, file) {
    return git.getFile(author, repo, branch, file)
        .then((file) => {
            return co(function* () {
                let payload = Object.assign({}, storablePayload);

                let [date, name] = file.name.replace(/.md/g, "").split("_");
                let {
                    html,
                    meta
                } = yield markdown.convert(file.content);

                payload.name = (meta.title || _makeTitle(name));
                payload.seo = (meta.seo || `${date}-${name}`);
                payload.body = html;
                payload.meta = meta;
                payload.createdDate = moment(date).unix();
                payload.updatedDate = moment().unix();
                let out = yield payload;
                return out;
            });
        });
};

function processIncomingData(body) {
    return co(function* () {
        const pr = yield webhook.acceptValidPRs(body);
        const {
            author,
            repo
        } = yield webhook.getRepoAndOwner(pr);
        let files = yield commit.getFilesFromCommitHash(author, repo, pr.number)
        return yield files.map((file) => {
            return getStorable(
                author,
                repo,
                "master",
                file.filename
            )
        });
    });
}

module.exports = {
    getStorable,
    processIncomingData
};

const _makeTitle = (string) => {
    return string.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};