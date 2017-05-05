const {
    parse
} = require("jekyll-markdown-parser");
const minify = require('html-minifier').minify;
const htmlMinifyOptions = {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeTagWhitespace: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    minifyCss: true,
    minifyJs: true,
    removeComments: true
};
const convert = (file) => {
    return new Promise((resolve, reject) => {

        let {
            html,
            parsedYaml
        } = parse(file);
        html = minify(html, htmlMinifyOptions);
        resolve({
            html,
            meta: (parsedYaml || {})
        });
    });
};

module.exports = {
    convert
};