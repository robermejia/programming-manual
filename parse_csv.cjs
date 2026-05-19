const fs = require('fs');
const path = require('path');

const csvPath = 'c:\\Users\\rober\\Desktop\\playlist.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

const lines = csvContent.split('\n').filter(l => l.trim().length > 0).slice(1);

const topics = [];
let currentTopic = null;

const topicTitles = [
    "1. Introducción a React",
    "2. JSX",
    "3. Componentes",
    "4. Styled Components",
    "5. React Router Dom V5",
    "6. React Router Dom V6+",
    "7. Bootstrap",
    "8. Vite y Tailwind CSS",
    "9. React Hooks",
    "10. Formularios",
    "11. Librerías Útiles",
    "12. Material UI",
    "13. Storage Local",
    "14. Context API",
    "15. Redux",
    "16. API Rest",
    "17. Variables de Entorno",
    "18. Axios",
    "19. API Rest Categorías/Productos",
    "20. Login y Registro",
    "21. Pasarela de Pago Webpay",
    "22. Pasarela de Pago PayPal",
    "23. Paso a Producción",
    "24. Proyecto: Notas con Sweetalert2 y TinyMCE",
    "25. Next.js - Introducción",
    "26. Next.js - Conceptos Avanzados",
    "27. Next.js - API con Axios",
    "28. Next.js - Hooks y Nookies",
    "29. Next.js - Panel de Administración",
    "30. Ant Design",
    "31. Conclusión y Cursos Adicionales"
];
let topicIndex = -1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Find the last comma, which separates the title and the URL
    const lastCommaIndex = line.lastIndexOf(',http');
    if (lastCommaIndex === -1) continue;
    
    const url = line.substring(lastCommaIndex + 1).trim();
    const firstCommaIndex = line.indexOf(',');
    let titleStr = line.substring(firstCommaIndex + 1, lastCommaIndex).trim();
    
    // Remove quotes if present
    if (titleStr.startsWith('"') && titleStr.endsWith('"')) {
        titleStr = titleStr.substring(1, titleStr.length - 1);
    }
    
    const title = titleStr.trim();
    
    if (title.startsWith('001.')) {
        topicIndex++;
        currentTopic = {
            id: 'video-topic-' + (topicIndex + 1),
            title: topicTitles[topicIndex] || ('Sección ' + (topicIndex + 1)),
            videos: [],
            description: "Aprende los conceptos paso a paso con la lista de reproducción en video.",
            content: []
        };
        topics.push(currentTopic);
    }
    
    // Add to current topic
    if (currentTopic) {
        currentTopic.videos.push({ title: title, url: url });
    }
}

const jsContent = `export const videoTutorialsCategory = {
  title: "12. Videotutoriales del Curso",
  topics: ${JSON.stringify(topics, null, 4)}
};
`;

const destPath = 'e:\\Programación\\programming-manual\\src\\data\\react-categories\\videotutorials.js';
fs.writeFileSync(destPath, jsContent, 'utf8');

console.log("Successfully created " + destPath);
