import { toISOStringWithTimezone } from './isoDateTimeZone.js';
axios.defaults.baseURL = 'https://personal-finance-3t1h.onrender.com'

async function InitializeRequest() {
    const res = await axios.get('/hi')
}

setInterval(InitializeRequest, 1000 * 60 * 6)

let DATA = {
    // date: [expense objects]
};


let totalExpenses = {
    // date: total amount
}

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const addExpensesBtn = document.querySelector('#addExpensesFinal');
const expensesTodayDate = document.querySelector('#dateToday');

let date = new Date()
let today = toISOStringWithTimezone(date).split('T')[0]

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
    updateLocalStorage();
}

expensesTodayDate.innerHTML = today;

//! Load data from localStorage
const expenses = localStorage.getItem('expenses');

if (expenses) {
    DATA = JSON.parse(expenses);
    generateTable();
}

addDateToData(today);

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
    const tr = obj.closest("tr");
    const button = obj.closest("button");
    const date = tr.getAttribute("data-date");
    const index = Number(tr.getAttribute("data-index"));

    const descriptionCell = tr.children[1];
    const amountCell = tr.children[2];

    //? Enable editing
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

        DATA[date][index].description = descriptionCell.innerText.trim();
        DATA[date][index].amount = parseFloat(amountCell.innerText.trim()) || 0;

        updateLocalStorage();
        fillTotalExpenses();
        updateChart();
    }
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

    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    //? Compute last month details
    let lastMonthIndex, lastYear;
    if (currentMonthIndex === 0) {
        lastMonthIndex = 11;
        lastYear = currentYear - 1;
    } else {
        lastMonthIndex = currentMonthIndex - 1;
        lastYear = currentYear;
    }

    //? Generate monthly data arrays for current and previous month
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
                    reset: true //? Only show the reset (home) icon
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

//! START Suggestions //
const chatMessages = document.getElementById('chat-messages');
const generateSuggestionBtn = document.querySelector('#generate-suggestion-btn');
const clearMessages = document.querySelector('#clear-messages');

generateSuggestionBtn.addEventListener('click', async function () {
    try {
        await addMessage('bot');
        addMsgToLocalStorage()
    } catch (err) {
        console.log(err)
    }
})

clearMessages.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear all messages?')) {
        chatMessages.innerHTML = '';
        localStorage.removeItem('htmlInner')
    } else {
        return
    }
})

async function addMessage(sender = 'user') {
    const messageEl = document.createElement('div');
    messageEl.className = sender === 'user' ? 'text-right mb-2' : 'text-left mb-2';
    messageEl.classList.add('rounded-md', 'p-2', 'px-4', 'bg-blue-600', 'bg-opacity-10', 'border', 'border-neutral-600', 'border-opacity-50');
    messageEl.innerHTML = `<div class="loader"></div>`;
    chatMessages.appendChild(messageEl);
    try {

        const res = await axios.post('/Suggestions', { data: JSON.parse(localStorage.getItem('expenses')) })
        const data = res.data.response;
        let date = new Date()
        // ? Turning 24 hr to 12 hr AM PM format
        let time24 = toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[0] + ':' + toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[1]
        let time = (parseInt(time24.split(':')[0]) > 12 ? parseInt(time24.split(':')[0]) - 12 : parseInt(time24.split(':')[0])) + ':' + time24.split(':')[1] + ' ' + (parseInt(time24.split(':')[0]) >= 12 ? 'PM' : 'AM')
        messageEl.innerHTML = `<div class="text-mainText opacity-50 text-sm my-2"><span class="bg-neutral-600 bg-opacity-30  rounded-full  p-1 px-4 ">${time}</span>
        </div>
         <div>${data}</div>`;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return data;
    }
    catch (err) {
        console.log(err)
    }
    messageEl.remove()
    throw new Error('Failed to fetch data from backend')
}

function addMsgToLocalStorage() {
    const msg = document.querySelector('#chat-messages')
    let date = new Date()
    let time = toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[0] + ':' + toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[1]
    time += ' ' + (parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM')
    let htmlInner = JSON.parse(localStorage.getItem('htmlInner')) || ""
    htmlInner = msg.innerHTML
    localStorage.setItem('htmlInner', JSON.stringify(htmlInner))
}

function addMsgFromLocalStorage() {
    const msg = document.querySelector('#chat-messages')
    let htmlInner = JSON.parse(localStorage.getItem('htmlInner')) || ""
    msg.innerHTML = htmlInner
}

addMsgFromLocalStorage()

const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};

window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.toggleModal = toggleModal;
window.changeDateBack = changeDateBack;
window.changeDateForward = changeDateForward;