const GitHubApi = require("github");
const PromisePolyfill = require('bluebird');

const makeConfig = () => {

    var github = new GitHubApi({
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub
        pathPrefix: "", // for some GHEs; none for GitHub
        headers: {
            "user-agent": "Blogs Bot" // GitHub is happy with a unique user agent
        },
        Promise : PromisePolyfill,
        followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
        timeout: 15000
    });

    github.authenticate({
        type: "oauth",
        token: process.env.GITHUB_TOKEN
    });

    return github;
};
module.exports =  makeConfig();
