import { toISOStringWithTimezone } from './isoDateTimeZone.js';

let DATA = {
    // date: [expense objects]
    "2025-02-02": [
        { description: "Food", amount: 300, date: "2025-02-02", index: 0 },
        { description: "Transport", amount: 100, date: "2025-02-02", index: 1 },
        { description: "Rent", amount: 1000, date: "2025-02-02", index: 2 },
        // ... other expenses for this date ...
    ],
    "2025-02-05": [
        { description: "Food", amount: 300, date: "2025-02-03", index: 0 },
        { description: "Transport", amount: 100, date: "2025-02-03", index: 1 },
        { description: "Rent", amount: 1000, date: "2025-02-03", index: 2 },
        // ... other expenses for this date ...
    ],
    // ... more dates as needed ...
};

// updateLocalStorage();

let totalExpenses = {

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


addDateToData(today);
generateTable();
updatechart();

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
}

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

    }

    DATA[date][index].description = descriptionCell.innerText.trim();
    DATA[date][index].amount = parseFloat(amountCell.innerText.trim()) || 0;

    // console.log(DATA[date][index].amount = parseFloat(amountCell.innerText.trim()) || 0);

    updateLocalStorage();

}

function deleteExpense(obj) {
    const tr = obj.closest('tr');
    const date = tr.getAttribute('data-date');
    const index = Number(tr.getAttribute('data-index'));
    DATA[date].splice(index, 1);
    generateTable();
    updateLocalStorage();
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
    updateLocalStorage();
    // expenseForm.reset();
});


//! Initialize Chart //

function updatechart() {

    window.addEventListener("load", () => {
        (function () {
            buildChart("#apex-multiple-area-charts-compare-alt", (mode) => ({
                chart: {
                    height: 400,
                    type: "area",
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                series: [
                    {
                        name: lastMonth,
                        data: [
                            20000, 40000, 60000, 30000, 40000, 100000, 70000, 90000,
                            70000, 65000, 90000, 100000,
                        ],
                    },
                    {
                        name: currentMonth,
                        data: [
                            7000, 18000, 20000, 40000, 27000, 50000, 19000, 99000,
                            32000, 70000, 42000, 50000,
                        ],
                    },
                ],
                legend: {
                    show: true,
                    position: "top",
                    horizontalAlign: "right",
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        offsetY: 2,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                    width: 2,
                },
                grid: {
                    strokeDashArray: 2,
                    borderColor: "oklch(var(--bc) / 0.4)",
                },
                colors: ["oklch(var(--p))", "oklch(var(--in))"],
                fill: {
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        gradientToColors: ["oklch(var(--b1))"],
                        opacityTo: 0.3,
                        stops: [0, 90, 100],
                    },
                },
                xaxis: {
                    type: "category",
                    tickPlacement: "on",
                    categories: [
                        "1 January",
                        "1 February",
                        "1 March",
                        "1 April",
                        "1 May",
                        "1 June",
                        "1 July",
                        "1 August",
                        "1 September",
                        "1 October",
                        "1 November",
                        "1 December",
                    ],
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        stroke: {
                            dashArray: 0,
                        },
                        dropShadow: {
                            show: false,
                        },
                    },
                    tooltip: {
                        enabled: false,
                    },
                    labels: {
                        style: {
                            colors: "oklch(var(--bc) / 0.9)",
                            fontSize: "12px",
                            fontWeight: 400,
                        },
                        formatter: (title) => {
                            let t = title;

                            if (t) {
                                const newT = t.split(" ");
                                t = `${newT[1].slice(0, 3)}`;
                            }

                            return t;
                        },
                    },
                },
                yaxis: {
                    labels: {
                        align: "left",
                        minWidth: 0,
                        maxWidth: 140,
                        style: {
                            colors: "oklch(var(--bc) / 0.9)",
                            fontSize: "12px",
                            fontWeight: 400,
                        },
                        formatter: (value) =>
                            value >= 1000 ? `${value / 1000}k` : value,
                    },
                },
                tooltip: {
                    x: {
                        format: "MMMM yyyy",
                    },
                    y: {
                        formatter: (value) =>
                            `$${value >= 1000 ? `${value / 1000}k` : value}`,
                    },
                    custom: function (props) {
                        return buildTooltipCompareTwoAlt(props, {
                            title: "Revenue",
                            mode,
                            valuePrefix: "$",
                            hasTextLabel: true,
                            wrapperExtClasses: "",
                            markerExtClasses: "",
                        });
                    },
                },
                responsive: [
                    {
                        breakpoint: 568,
                        options: {
                            chart: {
                                height: 300,
                            },
                            labels: {
                                style: {
                                    colors: "oklch(var(--bc) / 0.9)",
                                    fontSize: "10px",
                                },
                                offsetX: -2,
                                formatter: (title) => title.slice(0, 3),
                            },
                            yaxis: {
                                labels: {
                                    align: "left",
                                    minWidth: 0,
                                    maxWidth: 140,
                                    style: {
                                        colors: "oklch(var(--bc) / 0.9)",
                                        fontSize: "10px",
                                    },
                                    formatter: (value) =>
                                        value >= 1000 ? `${value / 1000}k` : value,
                                },
                            },
                        },
                    },
                ],
            }));
        })();
    });
}

// !END Initialize Chart //


const toggleModal = (id) => {
    document.querySelector(`#${id}`).classList.toggle('hidden')
};

// Expose module functions to the global scope for inline event handlers
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.toggleModal = toggleModal;
window.changeDateBack = changeDateBack;
window.changeDateForward = changeDateForward;
