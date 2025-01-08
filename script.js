let transactions = [];

const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],  // Les catégories ou types seront mises à jour ici
        datasets: [{
            label: 'Dépenses',
            data: [],  // Les montants des dépenses seront mises à jour ici
            backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Couleur de fond des barres
            borderColor: 'rgba(75, 192, 192, 1)',        // Couleur des bordures des barres
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


// Fonction pour mettre à jour le tableau avec les transactions
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

// Fonction pour mettre à jour le tableau de bord (revenus, dépenses, solde)
function updateDashboard() {
    const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = `${totalIncome} €`;
    document.getElementById("total-expenses").textContent = `${totalExpenses} €`;
    document.getElementById("balance").textContent = `${balance} €`;

    // Mettre à jour le graphique
    updateChart('category');  // Par défaut, afficher par catégorie
}

// Fonction pour mettre à jour le graphique en fonction de la vue
function updateChart(view) {
    const expenses = transactions.filter(t => t.type === "expense");

    if (view === 'category') {
        // Regrouper les dépenses par catégorie
        const categories = [...new Set(expenses.map(t => t.category))];
        const amounts = categories.map(category => 
            expenses.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0)
        );

        expenseChart.data.labels = categories;
        expenseChart.data.datasets[0].data = amounts;
    } else if (view === 'type') {
        // Regrouper les dépenses par type (revenu/dépense)
        const types = ['income', 'expense'];
        const amounts = types.map(type => 
            expenses.filter(t => t.type === type).reduce((sum, t) => sum + t.amount, 0)
        );

        expenseChart.data.labels = ['Revenu', 'Dépense'];
        expenseChart.data.datasets[0].data = amounts;
    }

    expenseChart.update();  // Actualiser le graphique
}

// Événements pour le formulaire
document.getElementById("data-form").addEventListener("submit", e => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    transactions.push({ category, type, amount });

    updateDashboard();  // Mettre à jour le tableau et le graphique
    updateTable();  // Mettre à jour la table

    e.target.reset();
});

// Gestion des vues dynamiques
document.getElementById("view-category").addEventListener("click", () => {
    updateChart('category');
});
document.getElementById("view-type").addEventListener("click", () => {
    updateChart('type');
});

// Initialiser le tableau de bord au chargement
updateDashboard();
