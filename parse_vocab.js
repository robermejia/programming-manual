const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\rober\\Desktop\\vocabulario springboot.txt', 'utf8');
const lines = content.split('\n');

const groups = {
    'A-D': [],
    'E-J': [],
    'K-P': [],
    'Q-Z': [],
    'Adicionales': []
};

let currentGroup = '';

lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('## ')) {
        const letter = trimmed.substring(3).trim();
        if (['A', 'B', 'C', 'D'].includes(letter)) currentGroup = 'A-D';
        else if (['E', 'F', 'G', 'H', 'I', 'J'].includes(letter)) currentGroup = 'E-J';
        else if (['K', 'L', 'M', 'N', 'O', 'P'].includes(letter)) currentGroup = 'K-P';
        else if (['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].includes(letter)) currentGroup = 'Q-Z';
        else if (trimmed.includes('Términos Adicionales')) currentGroup = 'Adicionales';
        return;
    }

    if (currentGroup && (trimmed.startsWith('**') || trimmed.includes(' - '))) {
        // Format to "Term: Definition" or similar clean text
        const clean = trimmed.replace(/\*\*/g, '');
        groups[currentGroup].push(clean);
    }
});

const generateTopic = (id, title, items) => {
    return {
        id: id,
        title: title,
        description: `Glosario completo de términos para la sección ${title}.`,
        details: items.join('\n\n')
    };
};

const topics = [
    generateTopic('sb-vocab-ad', 'Glosario A - D', groups['A-D']),
    generateTopic('sb-vocab-ej', 'Glosario E - J', groups['E-J']),
    generateTopic('sb-vocab-kp', 'Glosario K - P', groups['K-P']),
    generateTopic('sb-vocab-qz', 'Glosario Q - Z', groups['Q-Z']),
    generateTopic('sb-vocab-ext', 'Términos Adicionales', groups['Adicionales'])
];

console.log(JSON.stringify({ topics }, null, 4));
