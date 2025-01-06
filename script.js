// Supprime les caches
async function clearCaches() {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log(`Cache "${cacheName}" supprimé`);
    }
}

// Recharge la page après nettoyage
clearCaches().then(() => {
    console.log('Caches nettoyés, rechargement de la page...');
    window.location.reload();
});
