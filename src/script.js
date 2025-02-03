const addExpensesBtn = document.querySelector('#addExpensesFinal');



addExpensesBtn.addEventListener('click', () => {
    const expenses = document.querySelector('#expense-component').value;
    const expenseComponent = expenses.cloneNode(true);
    const expensesItem = ex.cloneNode('li');
    expensesItem.textContent = expenses;
    expensesList.appendChild(expensesItem);
    document.querySelector('#expenses').value = '';
});

const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};