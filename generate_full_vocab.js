const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\rober\\Desktop\\vocabulario springboot.txt', 'utf8');
const lines = content.split('\n');

const terms = [];
let currentLetter = '';

lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('## ')) {
        // Skip letters for terms list, but we use them to group if needed
        return;
    }

    if (trimmed.includes(' - ')) {
        const parts = trimmed.split(' - ');
        const term = parts[0].replace(/\*\*/g, '').trim();
        const definition = parts.slice(1).join(' - ').trim();
        terms.push({ title: term, text: definition });
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        // Just a header maybe? Or a term without definition?
        // Skip or handle if definition follows.
    }
});

// Group terms into topics of roughly 50-70 terms each for better UI performance
const chunks = [];
const chunkSize = 60;
for (let i = 0; i < terms.length; i += chunkSize) {
    chunks.push(terms.slice(i, i + chunkSize));
}

const topics = chunks.map((chunk, index) => {
    const firstTerm = chunk[0].title[0].toUpperCase();
    const lastTerm = chunk[chunk.length - 1].title[0].toUpperCase();
    return {
        id: `sb-vocab-full-${index}`,
        title: `Glosario (${firstTerm} - ${lastTerm})`,
        description: `Parte ${index + 1} del vocabulario completo de Spring Boot.`,
        content: chunk
    };
});

const output = `export const vocabularyCategory = {
    title: "0. Vocabulario de Spring Boot",
    topics: ${JSON.stringify(topics, null, 4)}
};`;

fs.writeFileSync('c:\\Users\\rober\\Desktop\\programming-manual\\src\\data\\springboot-categories\\vocabulary.js', output);
console.log('Successfully generated vocabulary.js with ' + terms.length + ' terms.');
