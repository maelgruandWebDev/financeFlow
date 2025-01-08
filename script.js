const transactions = [];

document.getElementById("data-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!category || isNaN(amount) || amount <= 0) {
        alert("Veuillez remplir tous les champs avec des valeurs valides !");
        return;
    }

    const transaction = { category, type, amount, date: new Date().toLocaleDateString() };
    transactions.push(transaction);

    updateTable();
    e.target.reset();
});
function addRow(transaction) {
    const tableBody = document.getElementById("data-table");

    // Supprimer la ligne par défaut s'il y a des données
    const noDataRow = document.getElementById("no-data");
    if (noDataRow) {
        noDataRow.remove();
    }

    // Ajouter une nouvelle ligne pour la transaction
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${transaction.category}</td>
        <td>${transaction.type === "income" ? "Revenu" : "Dépense"}</td>
        <td>${transaction.amount.toFixed(2)} €</td>
        <td>${transaction.date}</td>
        <td><button onclick="deleteTransaction(this)">Supprimer</button></td>
    `;
    tableBody.appendChild(row);
}

function updateTable() {
    const tableBody = document.getElementById("data-table")

    tableBody.innerHTML = ""; // Réinitialise le tableau


    transactions.forEach((t, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.category}</td>
            <td>${t.type === "income" ? "Revenu" : "Dépense"}</td>
            <td>${t.amount.toFixed(2)} €</td>
            <td>${t.date}</td>
            <td><button onclick="deleteTransaction(${index})">Supprimer</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTable();
}
