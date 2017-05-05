require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
const blog = require(`${__dirname}/../../modules/blog`);

describe("Blog Module", () => {
    it('should return a storable payload for a given file', () => {
        return blog.getStorable("matteo-hertel", "blog", "master", "test/posts/2017-01-27_test-post-seo.md")
        .then((data) => {
            data.updatedDate =  1482363367071;
            expect(data).toMatchSnapshot("storableFile");
        });
    });
    it('should execute the catch if the file does not exists', () => {
        return blog.getStorable("does/not/exists")
        .catch((exc) => {
            expect(exc).toBeDefined();
        });
    });
});
