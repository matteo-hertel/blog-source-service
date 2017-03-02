const markdownProcessor = require(`${__dirname}/../../modules/markDownProcessor`);
describe("Markdown Module", () => {
    it('should return HTML from markdown input', () => {
        let markdown = `# H1
## H2
### H3`;
        let html = `<h1>H1</h1>

<h2>H2</h2>

<h3>H3</h3>`;
        markdownProcessor.convert(markdown)
        .then((converted) => {
            expect(converted).toBe(html);
        });

    });
    it('should invoke catch on error', () => {
        let markdown = ``;
        let html = `<h1>H1</h1>

<h2>H2</h2>

<h3>H3</h3>`;
        markdownProcessor.convert(markdown)
        .catch((exc) => {
            expect(exc).toBeDefined();
        });

    });
});
