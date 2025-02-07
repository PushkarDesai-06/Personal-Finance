import { toISOStringWithTimezone } from './isoDateTimeZone.js';

axios.baseURL = 'http://localhost:8000'


let DATA = {
    // date: [expense objects]

    "2025-02-02": [
        { description: "Food", amount: 300, date: "2025-02-02", index: 0 },
        { description: "Transport", amount: 100, date: "2025-02-02", index: 1 },
        { description: "Rent", amount: 1000, date: "2025-02-02", index: 2 },

    ],
    "2025-02-05": [
        { description: "Food", amount: 300, date: "2025-02-03", index: 0 },
        { description: "Transport", amount: 100, date: "2025-02-03", index: 1 },
        { description: "Rent", amount: 1000, date: "2025-02-03", index: 2 },

    ],

};

// updateLocalStorage();

let totalExpenses = {
    // date: total amount
}

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



const addExpensesBtn = document.querySelector('#addExpensesFinal');
const expensesTodayDate = document.querySelector('#dateToday');

let date = new Date()
let today = toISOStringWithTimezone(date).split('T')[0]
// console.log(today);
const currentMonth = Months[new Date().getMonth()];
const lastMonth = Months[new Date().getMonth() - 1];

function addDateToData(today) {
    if (!DATA[today]) {
        DATA[today] = [];
        updateLocalStorage();
    }
}

function addModalDate() {
    window.addEventListener('load', function () {
        // Basic
        flatpickr('#flatpickr-date', {
            monthSelectorType: 'static'
        })
    })
}

addModalDate()

function fillTotalExpenses() {
    for (const date in DATA) {
        totalExpenses[date] = DATA[date].reduce((acc, curr) => acc + curr.amount, 0);
    }
    // console.log(totalExpenses);
    updateLocalStorage();
}




expensesTodayDate.innerHTML = today;
// console.log('changed');

// Load data from localStorage
const expenses = localStorage.getItem('expenses');
if (expenses) {
    DATA = JSON.parse(expenses);
    generateTable();
}

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(DATA));
    localStorage.setItem('totalExpenses', JSON.stringify(totalExpenses));
}

addDateToData(today);
fillTotalExpenses();
generateTable();
updateChart();

//! Handle forward and backward date changes

function changeDateBack() {
    date.setDate(date.getDate() - 1);
    today = toISOStringWithTimezone(date).split('T')[0];
    expensesTodayDate.innerHTML = today;
    addDateToData(today)
    generateTable();
}

function changeDateForward() {
    date.setDate(date.getDate() + 1);
    today = toISOStringWithTimezone(date).split('T')[0];
    expensesTodayDate.innerHTML = today;
    addDateToData(today)
    generateTable();
}

//! Generate table from DATA object

function generateTable() {
    const table = document.querySelector('#expensesTable');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    // Use forEach with index to ensure the index is current

    DATA[today].forEach((expense, i) => {
        tbody.innerHTML += `
                <tr data-date="${today}" data-index="${i}">
                    <td class="hidden">${i}</td>
                    <td class="text-nowrap">${expense.description}</td>
                    <td class="text-center">${expense.amount}</td>
                    <td class="flex justify-end">
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button" 
                        onclick="editExpense(this)"
                        >
                            <span class="icon-[tabler--pencil] size-5" "></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button" onclick="deleteExpense(this)">
                            <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                    </td>
                </tr>
            `;
    });

}

function editExpense(obj) {

    // console.log(obj);
    const tr = obj.closest("tr");
    const button = obj.closest("button");
    const date = tr.getAttribute("data-date");
    const index = Number(tr.getAttribute("data-index"));

    const descriptionCell = tr.children[1];
    const amountCell = tr.children[2];

    // Enable editing
    if (descriptionCell.contentEditable !== "true") {

        descriptionCell.contentEditable = "true";
        amountCell.contentEditable = "true";

        button.classList.toggle("bg-blue-500");
        button.classList.toggle("hover:bg-blue-500");
        button.classList.toggle("text-white");

        descriptionCell.focus();
    } else {
        descriptionCell.contentEditable = "false";
        amountCell.contentEditable = "false";
        button.classList.toggle("bg-blue-500");
        button.classList.toggle("hover:bg-blue-500");
        button.classList.toggle("text-white");
        // button.style.backgroundColor = "transparent";

        DATA[date][index].description = descriptionCell.innerText.trim();
        DATA[date][index].amount = parseFloat(amountCell.innerText.trim()) || 0;


        updateLocalStorage();
        fillTotalExpenses();
        updateChart();
    }

    // console.log(DATA[date][index].amount = parseFloat(amountCell.innerText.trim()) || 0);

}

function deleteExpense(obj) {
    const tr = obj.closest('tr');
    const date = tr.getAttribute('data-date');
    const index = Number(tr.getAttribute('data-index'));
    DATA[date].splice(index, 1);
    generateTable();
    updateLocalStorage();
    fillTotalExpenses();
    updateChart();
}

//! Handle form submission which adds expenses to the table

const expenseForm = document.querySelector('#addExpensesForm');

expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const expenseDescription = document.getElementById('inputName').value;
    const expenseDate = document.getElementById('flatpickr-date').value;
    const expenseAmount = document.getElementById('number-input-label').value;
    // console.log({ expenseDescription, expenseDate, expenseAmount });

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
    fillTotalExpenses();
    updateLocalStorage();
    updateChart();
    // expenseForm.reset();
});


//! Initialize Chart //


function generateDayArray() {
    let days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    return days;
}

function generateMonthDataArray(targetMonth, targetYear) {
    let dayData = new Array(31).fill(0);
    Object.keys(totalExpenses).forEach(dateStr => {
        let dateObj = new Date(dateStr);
        if (dateObj.getMonth() === targetMonth && dateObj.getFullYear() === targetYear) {
            let day = dateObj.getDate();
            dayData[day - 1] += totalExpenses[dateStr];
        }
    });
    return dayData;
}

//! Initialize ApexCharts Area Chart

function updateChart() {

    document.querySelector('#ApexChartDiv').innerHTML = '';

    // Get current date details
    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Compute last month details
    let lastMonthIndex, lastYear;
    if (currentMonthIndex === 0) {
        lastMonthIndex = 11;
        lastYear = currentYear - 1;
    } else {
        lastMonthIndex = currentMonthIndex - 1;
        lastYear = currentYear;
    }

    // Generate monthly data arrays for current and previous month
    let currentMonthData = generateMonthDataArray(currentMonthIndex, currentYear);
    let lastMonthData = generateMonthDataArray(lastMonthIndex, lastYear);

    let options = {
        chart: {
            type: 'area',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true // Only show the reset (home) icon
                }
            },
            height: 400,
            zoom: {
                enabled: true,
                type: 'x'
            }
        },
        series: [
            {
                name: Months[currentMonthIndex],
                data: currentMonthData
            },
            {
                name: Months[lastMonthIndex],
                data: lastMonthData
            }
        ],
        xaxis: {
            categories: generateDayArray(),
            min: 1,
            max: 10,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.2)',
        },
        tooltip: {
            x: {
                format: 'dd MMM'
            }
        },
    };

    let chart = new ApexCharts(document.querySelector('#ApexChartDiv'), options);
    chart.render();
}

// !END Initialize Chart //


//! START Chatbot //


async function sendToBackend(message) {
    const res = await axios.post('/Suggestions', { message: message, data: JSON.parse(localStorage.getItem('expenses')) })

}

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

function addMessage(text, sender = 'user') {
    const messageEl = document.createElement('div');
    messageEl.className = sender === 'user' ? 'text-right mb-2' : 'text-left mb-2';
    messageEl.textContent = text;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botResponse(userText) {
    // Gemini chatbot simple simulated response.
    return `Gemini Chatbot: You said "${userText}"`;
}

chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;


});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') chatSend.click();
});



const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};

// Expose module functions to the global scope for inline event handlers
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.toggleModal = toggleModal;
window.changeDateBack = changeDateBack;
window.changeDateForward = changeDateForward;
