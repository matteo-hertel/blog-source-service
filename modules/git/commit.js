const github = require(`${__dirname}/github`);

const getFilesFromCommitHash = (owner, repo, number) => {
    return github.pullRequests.getFiles({
        owner,
        repo,
        number
    });
};

module.exports = {
    getFilesFromCommitHash
};
