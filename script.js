async function clearCaches() {
    // Vérifier si le nettoyage a déjà été effectué
    if (localStorage.getItem("cacheCleared") === "true") {
        console.log("Les caches ont déjà été nettoyés. Pas de rechargement nécessaire.");
        return; // Sortir pour éviter de recharger la page
    }

    // Supprimer tous les caches
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log(`Cache "${cacheName}" supprimé`);
    }

    // Marquer le nettoyage comme effectué
    localStorage.setItem("cacheCleared", "true");

    // Recharger la page après nettoyage
    console.log("Caches nettoyés, rechargement de la page...");
    window.location.reload();
}

// Appeler la fonction
clearCaches();
