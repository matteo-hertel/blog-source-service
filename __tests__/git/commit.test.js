require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const commit = require(`${__dirname}/../../modules/git/commit`);
const webhook = require(`${__dirname}/../../modules/git/webhook`);

describe("Commit Module", () => {
    it('should return a list of file if a valid commit hash is passed ', () => {
        const pr = require(`${__dirname}/../../mocks/webhooks/mergedPR.json`);
        return webhook.getRepoAndOwner(pr)
            .then((data) => {
                return commit.getFilesFromCommitHash(data.author, data.repo, pr.number)
                    .then((files) => {
                        expect(files.length).toBeTruthy();
                    });
            });
    });
    it('should return an error if something went wrong while fetching commit files ', () => {
        return commit.getFilesFromCommitHash({})
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
});
