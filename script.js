let transactions = [];

function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = `${totalIncome} €`;
    document.getElementById("total-expenses").textContent = `${totalExpenses} €`;
    document.getElementById("balance").textContent = `${balance} €`;
}

function updateTable() {
    const tableBody = document.getElementById("data-table");
    tableBody.innerHTML = transactions
        .map(
            t => `
        <tr>
            <td>${t.category}</td>
            <td>${t.type === "income" ? "Revenu" : "Dépense"}</td>
            <td>${t.amount} €</td>
        </tr>
    `
        )
        .join("");
}

document.getElementById("data-form").addEventListener("submit", e => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    transactions.push({ category, type, amount });

    updateDashboard();
    updateTable();

    e.target.reset();
});
