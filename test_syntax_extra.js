
try {
    await import('./src/data/react-categories/actions_forms.js');
    console.log("actions_forms.js OK");
    await import('./src/data/react-categories/portals.js');
    console.log("portals.js OK");
    await import('./src/data/react-categories/server_components.js');
    console.log("server_components.js OK");
    await import('./src/data/react-categories/async_error.js');
    console.log("async_error.js OK");
} catch (e) {
    console.error("Syntax Error Found:");
    console.error(e);
}
