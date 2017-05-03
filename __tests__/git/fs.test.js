require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const git = require(`${__dirname}/../../modules/git/fs`);
describe("Git Module", () => {
    it('should return the file when calling github api for a particular file', () => {
        return git.getFile("matteo-hertel", "blog", "master", "README.md").then((file) => {
            expect(file).not.toBeFalsy();
        });
    });

    it('should throw an error if an error occurres while getting a file', () => {
        git.getFile("matteo-hertel", "blog", "does-not-exists-file", "README.md")
            .catch((exc) => {
                expect(exc).toBeDefined();
            });
    });
    it('should return an array of files when calling multiple file are passed', () => {
        return git.getFiles([
            {
                author: "matteo-hertel",
                repo: "blog",
                branch: "master",
                path: "README.md"
            },
            {
                author: "matteo-hertel",
                repo: "blog",
                branch: "master",
                path: "LICENSE"
            }
            ])
            .then((files) => {
                expect(file).toHaveLength(2);

            });
    });
    it('should return an error if one of the files does not exists', () => {
        return git.getFiles([
            {
                author: "matteo-hertel",
                repo: "blog",
                branch: "master",
                path: "README.md"
            },
            {
                author: "matteo-hertel",
                repo: "blog",
                branch: "master",
                path: "does-not-exists"
            }
            ])
            .catch((exc) => {
                expect(exc).toBeDefined();
            });
    });

    it('should return an array of files if a folder path is passed', () => {
        return git.getFolder("matteo-hertel", "blog", "master", "posts")
            .then((files) => {
                expect(files.length).toBeTruthy();
            });
    });

    it('should throw an error if an error occurres while getting a folder', () => {
        git.getFolder("matteo-hertel", "blog", "does-not-exists-folder", "error")
            .catch((exc) => {
                expect(exc).toBeDefined();
            });
    });
});