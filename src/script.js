let DATA = {
    // date: [expense objects]
    "2025-02-02": [
        { description: "Food", amount: 300, date: "2025-02-02", index: 0 },
        { description: "Transport", amount: 100, date: "2025-02-02", index: 1 },
        { description: "Rent", amount: 1000, date: "2025-02-02", index: 2 },
        // ... other expenses for this date ...
    ]
    // ... more dates as needed ...
};

const addExpensesBtn = document.querySelector('#addExpensesFinal');
generateTable();

// Load data from localStorage
const expenses = localStorage.getItem('expenses');
if (expenses) {
    DATA = JSON.parse(expenses);
    generateTable();
}

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(DATA));
}


function generateTable() {
    const table = document.querySelector('#expensesTable');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    // Use forEach with index to ensure the index is current
    for (const date in DATA) {
        DATA[date].forEach((expense, i) => {
            tbody.innerHTML += `
                <tr data-date="${date}" data-index="${i}">
                    <td class="hidden">${i}</td>
                    <td class="text-nowrap">${expense.description}</td>
                    <td class="text-center">${expense.amount}</td>
                    <td class="flex justify-end">
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                            <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button" onclick="deleteExpense(this)">
                            <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
}

function deleteExpense(obj) {
    const tr = obj.closest('tr');
    const date = tr.getAttribute('data-date');
    const index = Number(tr.getAttribute('data-index'));
    DATA[date].splice(index, 1);
    generateTable();
    updateLocalStorage();
}

const expenseForm = document.querySelector('#addExpensesForm');
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const expenseDescription = document.getElementById('inputName').value;
    const expenseDate = document.getElementById('flatpickr-date').value;
    const expenseAmount = document.getElementById('number-input-label').value;
    console.log({ expenseDescription, expenseDate, expenseAmount });

    // Add expense to DATA
    if (DATA[expenseDate]) {
        DATA[expenseDate].push({
            description: expenseDescription,
            amount: Number(expenseAmount)
        });
    } else {
        DATA[expenseDate] = [{
            description: expenseDescription,
            amount: Number(expenseAmount)
        }];
    }
    generateTable();
    updateLocalStorage();
    // Process the form data further as needed.
});

const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};