const markdownProcessor = require(`${__dirname}/../../modules/markDownProcessor`);
const filePath = `${__dirname}/../../mocks/md/dummy.md`;
const fs = require("fs");
describe("Markdown Module", () => {
    it('should return HTML and metadata from markdown input', () => {
        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) return console.log(err);
            markdownProcessor.convert(file)
            .then((data) => {
                expect(data).toMatchSnapshot("parsedMarkdown");
            })
        });
    });
});