import { toISOStringWithTimezone } from './isoDateTimeZone.js';
axios.defaults.baseURL = 'http://localhost:8000'

async function temp() {
    try {
        const res = await axios.post('/Suggestions' , {data : JSON.parse(localStorage.getItem('expenses'))})
        console.log(res.data)
    }
    catch (err) {
        console.log(err)

    }
}

// temp()



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
    "2025-01-01": [{ description: "January expense", amount: 137, date: "2025-01-01", index: 0 }],
    "2025-01-02": [{ description: "January expense", amount: 92,  date: "2025-01-02", index: 0 }],
    "2025-01-03": [{ description: "January expense", amount: 156, date: "2025-01-03", index: 0 }],
    "2025-01-04": [{ description: "January expense", amount: 68,  date: "2025-01-04", index: 0 }],
    "2025-01-05": [{ description: "January expense", amount: 180, date: "2025-01-05", index: 0 }],
    "2025-01-06": [{ description: "January expense", amount: 110, date: "2025-01-06", index: 0 }],
    "2025-01-07": [{ description: "January expense", amount: 145, date: "2025-01-07", index: 0 }],
    "2025-01-08": [{ description: "January expense", amount: 75,  date: "2025-01-08", index: 0 }],
    "2025-01-09": [{ description: "January expense", amount: 167, date: "2025-01-09", index: 0 }],
    "2025-01-10": [{ description: "January expense", amount: 98,  date: "2025-01-10", index: 0 }],
    "2025-01-11": [{ description: "January expense", amount: 134, date: "2025-01-11", index: 0 }],
    "2025-01-12": [{ description: "January expense", amount: 153, date: "2025-01-12", index: 0 }],
    "2025-01-13": [{ description: "January expense", amount: 60,  date: "2025-01-13", index: 0 }],
    "2025-01-14": [{ description: "January expense", amount: 120, date: "2025-01-14", index: 0 }],
    "2025-01-15": [{ description: "January expense", amount: 175, date: "2025-01-15", index: 0 }],
    "2025-01-16": [{ description: "January expense", amount: 112, date: "2025-01-16", index: 0 }],
    "2025-01-17": [{ description: "January expense", amount: 133, date: "2025-01-17", index: 0 }],
    "2025-01-18": [{ description: "January expense", amount: 90,  date: "2025-01-18", index: 0 }],
    "2025-01-19": [{ description: "January expense", amount: 86,  date: "2025-01-19", index: 0 }],
    "2025-01-20": [{ description: "January expense", amount: 142, date: "2025-01-20", index: 0 }],
    "2025-01-21": [{ description: "January expense", amount: 188, date: "2025-01-21", index: 0 }],
    "2025-01-22": [{ description: "January expense", amount: 97,  date: "2025-01-22", index: 0 }],
    "2025-01-23": [{ description: "January expense", amount: 128, date: "2025-01-23", index: 0 }],
    "2025-01-24": [{ description: "January expense", amount: 111, date: "2025-01-24", index: 0 }],
    "2025-01-25": [{ description: "January expense", amount: 165, date: "2025-01-25", index: 0 }],
    "2025-01-26": [{ description: "January expense", amount: 150, date: "2025-01-26", index: 0 }],
    "2025-01-27": [{ description: "January expense", amount: 79,  date: "2025-01-27", index: 0 }],
    "2025-01-28": [{ description: "January expense", amount: 139, date: "2025-01-28", index: 0 }],
    "2025-01-29": [{ description: "January expense", amount: 157, date: "2025-01-29", index: 0 }],
    "2025-01-30": [{ description: "January expense", amount: 103, date: "2025-01-30", index: 0 }],
    "2025-01-31": [{ description: "January expense", amount: 180, date: "2025-01-31", index: 0 }],


    "2025-12-01": [{ description: "December expense", amount: 164, date: "2025-12-01", index: 0 }],
    "2025-12-02": [{ description: "December expense", amount: 178, date: "2025-12-02", index: 0 }],
    "2025-12-03": [{ description: "December expense", amount: 112, date: "2025-12-03", index: 0 }],
    "2025-12-04": [{ description: "December expense", amount: 150, date: "2025-12-04", index: 0 }],
    "2025-12-05": [{ description: "December expense", amount: 145, date: "2025-12-05", index: 0 }],
    "2025-12-06": [{ description: "December expense", amount: 129, date: "2025-12-06", index: 0 }],
    "2025-12-07": [{ description: "December expense", amount: 120, date: "2025-12-07", index: 0 }],
    "2025-12-08": [{ description: "December expense", amount: 185, date: "2025-12-08", index: 0 }],
    "2025-12-09": [{ description: "December expense", amount: 171, date: "2025-12-09", index: 0 }],
    "2025-12-10": [{ description: "December expense", amount: 142, date: "2025-12-10", index: 0 }],
    "2025-12-11": [{ description: "December expense", amount: 110, date: "2025-12-11", index: 0 }],
    "2025-12-12": [{ description: "December expense", amount: 198, date: "2025-12-12", index: 0 }],
    "2025-12-13": [{ description: "December expense", amount: 123, date: "2025-12-13", index: 0 }],
    "2025-12-14": [{ description: "December expense", amount: 159, date: "2025-12-14", index: 0 }],
    "2025-12-15": [{ description: "December expense", amount: 167, date: "2025-12-15", index: 0 }],
    "2025-12-16": [{ description: "December expense", amount: 134, date: "2025-12-16", index: 0 }],
    "2025-12-17": [{ description: "December expense", amount: 190, date: "2025-12-17", index: 0 }],
    "2025-12-18": [{ description: "December expense", amount: 115, date: "2025-12-18", index: 0 }],
    "2025-12-19": [{ description: "December expense", amount: 132, date: "2025-12-19", index: 0 }],
    "2025-12-20": [{ description: "December expense", amount: 149, date: "2025-12-20", index: 0 }],
    "2025-12-21": [{ description: "December expense", amount: 155, date: "2025-12-21", index: 0 }],
    "2025-12-22": [{ description: "December expense", amount: 176, date: "2025-12-22", index: 0 }],
    "2025-12-23": [{ description: "December expense", amount: 180, date: "2025-12-23", index: 0 }],
    "2025-12-24": [{ description: "December expense", amount: 101, date: "2025-12-24", index: 0 }],
    "2025-12-25": [{ description: "December expense", amount: 188, date: "2025-12-25", index: 0 }],
    "2025-12-26": [{ description: "December expense", amount: 157, date: "2025-12-26", index: 0 }],
    "2025-12-27": [{ description: "December expense", amount: 142, date: "2025-12-27", index: 0 }],
    "2025-12-28": [{ description: "December expense", amount: 165, date: "2025-12-28", index: 0 }],
    "2025-12-29": [{ description: "December expense", amount: 134, date: "2025-12-29", index: 0 }],
    "2025-12-30": [{ description: "December expense", amount: 160, date: "2025-12-30", index: 0 }],
    "2025-12-31": [{ description: "December expense", amount: 175, date: "2025-12-31", index: 0 }],
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
    fetchFromBackend()
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
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');


async function fetchFromBackend(message) {
    try{

        const res = await axios.post('/Suggestions', { data: JSON.parse(localStorage.getItem('expenses')) })
        const data = res.data.response;
        console.log(res);
        addMessage(data, 'bot');
    }catch(err){
        console.log(err)
    }
        
}



function addMessage(text, sender = 'user') {
    const messageEl = document.createElement('div');
    messageEl.className = sender === 'user' ? 'text-right mb-2' : 'text-left mb-2';
    messageEl.classList.add('rounded-md', 'p-2' ,'px-4', 'bg-blue-600' , 'bg-opacity-10' , 'border', 'border-neutral-600' , 'border-opacity-50');
    messageEl.innerHTML = text;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};

// Expose module functions to the global scope for inline event handlers
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.toggleModal = toggleModal;
window.changeDateBack = changeDateBack;
window.changeDateForward = changeDateForward;
