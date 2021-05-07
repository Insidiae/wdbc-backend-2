const franc = require("franc");
const langs = require('langs');

const sentence = process.argv[2] || "";

const langCode = franc(sentence);

console.log(`The sentence "${sentence}" is in ${langCode == "und" ? "an unknown language.." : langs.where("3", langCode).name}.`);