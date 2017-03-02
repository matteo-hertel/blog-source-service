const acceptValidPRs = (payload) => {

    return new Promise((resolve, reject)=>{
        const pr = payload.pull_request || false;
        if(!payload.hasOwnProperty("pull_request")){
            return reject('Payload object does not have a pull_request property');
        }
        if(payload.pull_request.state !== 'closed'){
            return reject("Pull request is not closed");
        }
        if(payload.pull_request.merged !== true){
            return reject("Pull request is not merged");
        }
        return resolve(payload.pull_request);
    });
};
const getMergeSha = (payload) => {

    return new Promise((resolve, reject)=>{
        try{
            resolve(payload.pull_request.merge_commit_sha);
        }catch(exc){
            reject("Merge SHA does not exists");
        }
    });
};
const getRepoAndOwner = (payload) => {

    return new Promise((resolve, reject)=>{
        try{
            var repoData = {
                name: "",
                owner: ""
            };
            var repoName = payload.repository.full_name.split("/");
            repoData.owner = repoName[0];
            repoData.name = repoName[1];
            resolve(repoData);
        }catch(exc){
            reject("Cannot extract repo owner and name");
        }
    });
};

module.exports = {
    acceptValidPRs,
    getRepoAndOwner,
    getMergeSha
};
