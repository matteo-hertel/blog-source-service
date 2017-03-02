require('dotenv').config({
    path: `${__dirname}/../.env`
});

const git = require(`${__dirname}/git/fs`);
const markdown = require(`${__dirname}/markdownProcessor`);
const moment = require("moment");
const co = require("co");

const author = "matteo-hertel";
const repo = "blog";
const branch = "master";

const storablePayload = {
    name: "",
    seo: "",
    body: "",
    createdDate: "",
    updatedDate: ""
};

const getStorable = (file) => {
    return git.getFile(author, repo, branch, file)
        .then((file) => {
            return co(function*() {
                let payload = Object.assign({}, storablePayload);
                let [date, name] = file.name.replace(/.md/g, "").split("_");
                payload.name = _makeTitle(name);
                payload.seo = `${date}-${name}`;
                payload.body = markdown.convert(file.content);
                payload.createdDate = moment(date).unix();
                payload.updatedDate = moment().unix();
                let out = yield payload;
                return out;
            });
        });
};
const reIndexPosts = () => {
    return git.getFolder(author, repo, branch, "/test/posts")
        .then((files) => {
            return co(function*() {
                let out = yield files.map((item) => {
                    return getStorable(item.path);
                });
                return out;
            });
        });
};

module.exports = {
    getStorable,
    reIndexPosts
};

const _makeTitle = (string) => {
    return string.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};
