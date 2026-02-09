
try {
    await import('./src/data/react-categories/hooks_react19.js');
    console.log("hooks_react19.js OK");
    await import('./src/data/react-categories/hooks_basic.js');
    console.log("hooks_basic.js OK");
    await import('./src/data/react-categories/components.js');
    console.log("components.js OK");
    await import('./src/data/react-categories/context_refs.js');
    console.log("context_refs.js OK");
} catch (e) {
    console.error("Syntax Error Found:");
    console.error(e);
}
