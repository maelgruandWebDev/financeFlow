const transactions = [];

// Écouteur pour le formulaire
document.getElementById("data-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!category || isNaN(amount) || amount <= 0) {
        alert("Veuillez remplir tous les champs avec des valeurs valides !");
        return;
    }

    // Ajouter la transaction
    const transaction = { category, type, amount, date: new Date().toLocaleDateString() };
    transactions.push(transaction);

    // Mettre à jour la table et réinitialiser le formulaire
    updateTable();
    e.target.reset();
});

// Fonction pour ajouter une ligne
function addRow(transaction, index) {
    const tableBody = document.getElementById("data-table");

    // Ajouter une nouvelle ligne
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${transaction.category}</td>
        <td>${transaction.type === "income" ? "Revenu" : "Dépense"}</td>
        <td>${transaction.amount.toFixed(2)} €</td>
        <td>${transaction.date}</td>
        <td><button onclick="deleteTransaction(${index})">Supprimer</button></td>
    `;
    tableBody.appendChild(row);
}

// Fonction pour mettre à jour la table
function updateTable() {
    const tableBody = document.getElementById("data-table");

    // Réinitialiser le contenu du tableau
    tableBody.innerHTML = "";

    if (transactions.length === 0) {
        // Ajouter une ligne "Aucune transaction enregistrée" si aucune donnée
        const noDataRow = document.createElement("tr");
        noDataRow.id = "no-data";
        noDataRow.innerHTML = `
            <td colspan="5" style="text-align: center;">Aucune transaction enregistrée</td>
        `;
        tableBody.appendChild(noDataRow);
        return;
    }

    // Ajouter toutes les transactions
    transactions.forEach((transaction, index) => addRow(transaction, index));
}

// Fonction pour supprimer une transaction
function deleteTransaction(index) {
    // Supprimer la transaction sélectionnée
    transactions.splice(index, 1);

    // Mettre à jour la table
    updateTable();
}
