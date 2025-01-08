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

function updateTable() {
    const tableBody = document.getElementById("data-table");
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
