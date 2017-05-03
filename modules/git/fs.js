const github = require(`${__dirname}/github`);
const getFile = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then((res) => {
            res.content = Buffer.from(res.content, 'base64').toString();
            return {
                name: res.name,
                content: res.content
            };
        });
};
const getFiles = (files) => {
    return Promise.all(file.map((file) =>{
        return getFile = (file.author, file.repo, file.branch, file.path);
    }))
};
const getFolder = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then((files) => {
            return _extractFiles(files);
        });
};
module.exports = {
    getFile,
    getFolder
};

const _extractFiles = (list) => {
    let files = list.filter((item) => {
        return item.type === "file";
    });

    return files.map((item) => {
        return {
            name: item.name,
            path: item.path
        };
    });
};


const _get = (author, repo, branch, path) => {
    return github.repos.getContent({
        owner: author,
        repo: repo,
        path,
        ref: branch
    });
};
