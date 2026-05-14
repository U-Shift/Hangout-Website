const fs = require('fs');

let content = fs.readFileSync('translations.js', 'utf8');

// A simple way to load the translations object
const scriptContent = content + '\nmodule.exports = translations;';
fs.writeFileSync('temp_translations.js', scriptContent);
const translations = require('./temp_translations.js');

const newTranslations = {};

for (const lang in translations) {
    newTranslations[lang] = {};
    for (const key in translations[lang]) {
        // The script matching does: match[2].replace(/\s+/g, ' ')
        // So the key should be exactly that.
        // It's the original trimmed text with internal spaces normalized.
        const newKey = key.trim().replace(/\s+/g, ' ');
        const newValue = translations[lang][key].trim().replace(/\s+/g, ' ');
        newTranslations[lang][newKey] = newValue;
    }
}

const newContent = 'const translations = ' + JSON.stringify(newTranslations, null, 2) + ';\n';
fs.writeFileSync('translations.js', newContent);
console.log("Successfully fixed translations.js");
