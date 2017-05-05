require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const webhook = require(`${__dirname}/../../modules/git/webhook`);
const git = require(`${__dirname}/../../modules/git/fs`);

describe("Webhook Module", () => {
    it('should contain the pull request object', () => {
        return webhook.acceptValidPRs(require(`${__dirname}/../../mocks/webhooks/mergedPR.json`))
            .then((pr) => {
                expect(pr.pull_request.id).toBeDefined();
            });
    });
    it('should reject and return false if the pr object does not exitsts ', () => {
        return webhook.acceptValidPRs({})
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
    it('should reject and return false if the pr is not closed ', () => {
        return webhook.acceptValidPRs({
                pull_request: {
                    state: 'open'
                }
            })
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
    it('should reject and return false if the pr is not merged ', () => {
        return webhook.acceptValidPRs({
                pull_request: {
                    state: 'closed',
                    merged: false
                }
            })
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
    it('should contain the pull request name and owner', () => {
        return webhook.getRepoAndOwner(require(`${__dirname}/../../mocks/webhooks/mergedPR.json`))
            .then((repo) => {
                expect(repo.author).toBeDefined();
                expect(repo.repo).toBeDefined();
            });
    });
    it('should reject the promise if an error occurred while getting the repo name and owner', () => {
        return webhook.getRepoAndOwner({})
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
    it('should contain the merge reqeust sha', () => {
        return webhook.getMergeSha(require(`${__dirname}/../../mocks/webhooks/mergedPR.json`))
            .then((sha) => {
                expect(sha).toBeDefined();
            });
    });
    it('should reject and return false if the sha commit does not exitsts ', () => {
        return webhook.getMergeSha({})
            .catch((err) => {
                expect(err).toBeDefined();
            });
    });
});
