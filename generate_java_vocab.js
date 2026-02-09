const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\rober\\Desktop\\vocabulario java.txt', 'utf8');
const lines = content.split('\n');

const terms = [];

lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed.startsWith('#')) return;

    if (trimmed.includes(': ')) {
        const parts = trimmed.split(': ');
        const term = parts[0].replace(/\*\*/g, '').trim();
        const definition = parts.slice(1).join(': ').trim();
        terms.push({ title: term, text: definition });
    }
});

// Sort alphabetically
terms.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

// Group terms into topics
const groups = [
    { title: "Glosario A - C", range: /^[a-c]/i },
    { title: "Glosario D - H", range: /^[d-h]/i },
    { title: "Glosario I - P", range: /^[i-p]/i },
    { title: "Glosario Q - S", range: /^[q-s]/i },
    { title: "Glosario T - Z", range: /^[t-z]/i }
];

const topics = groups.map((group, index) => {
    const filtered = terms.filter(t => group.range.test(t.title));
    if (filtered.length === 0) return null;
    return {
        id: `java-vocab-full-${index}`,
        title: group.title,
        description: `Términos esenciales de Java (${group.title.split(' ')[1]}).`,
        content: filtered
    };
}).filter(t => t !== null);

const output = `export const vocabularyCategory = {
    title: "0. Vocabulario de Java",
    topics: ${JSON.stringify(topics, null, 4)}
};`;

fs.writeFileSync('c:\\Users\\rober\\Desktop\\programming-manual\\src\\data\\java-categories\\vocabulary.js', output);
console.log('Successfully generated vocabulary.js for Java with ' + terms.length + ' terms.');
