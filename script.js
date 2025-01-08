let transactions = [];

const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],  // Les catégories seront mises à jour ici
        datasets: [{
            label: 'Dépenses par catégorie',
            data: [],  // Les montants des dépenses seront mises à jour ici
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateDashboard() {
    const expenses = transactions.filter(t => t.type === "expense");
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    document.getElementById("total-expenses").textContent = `${totalExpenses} €`;

    // Regrouper les dépenses par catégorie
    const categories = [...new Set(expenses.map(t => t.category))];
    const amounts = categories.map(category => 
        expenses.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0)
    );

    // Mettre à jour le graphique
    expenseChart.data.labels = categories; // Mettre à jour les catégories
    expenseChart.data.datasets[0].data = amounts; // Mettre à jour les montants
    expenseChart.update(); // Actualiser le graphique
}

function updateTable() {
    const tableBody = document.getElementById("data-table");
    tableBody.innerHTML = transactions
        .map(t => `
        <tr>
            <td>${t.category}</td>
            <td>${t.type === "income" ? "Revenu" : "Dépense"}</td>
            <td>${t.amount} €</td>
        </tr>
    `)
        .join("");
}

document.getElementById("data-form").addEventListener("submit", e => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    transactions.push({ category, type, amount });

    updateDashboard(); // Mettre à jour le tableau et le graphique
    updateTable(); // Mettre à jour la table

    e.target.reset();
});
