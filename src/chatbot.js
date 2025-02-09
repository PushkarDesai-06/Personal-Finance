import { toISOStringWithTimezone } from './isoDateTimeZone.js';
axios.defaults.baseURL = 'https://personal-finance-3t1h.onrender.com';
// axios.defaults.baseURL = 'http://localhost:10000';


async function InitializeRequest() {
    const res = await axios.get('/hi')
}

setInterval(InitializeRequest, 1000 * 60 * 6)


const sendButton = document.getElementById('chatbox__send');
const chatboxInput = document.getElementById('chatbox__input');
const chatboxMessages = document.getElementById('chatbox__messages');
const clearChatToolbarButton = document.getElementById('clear-chat-toolbar');
// Global variable for chat history
let chat = JSON.parse(localStorage.getItem('localChat')) || [];

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem('localChat', JSON.stringify(document.getElementById('chatbox__messages').innerHTML))
}

// Load and render chat history on page load
function loadChatHistory() {
    const chatboxMessages = document.getElementById('chatbox__messages');
    chatboxMessages.innerHTML = chat;
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}


clearChatToolbarButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear chat history?')) {

        chatboxMessages.innerHTML = '';
        saveChatHistory();

    }

    return
});

function addHumanMsg(message) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbox__message', 'chatbox__message--human', 'justify-end', 'flex', 'mb-2');
    const msgText = document.createElement('p');
    msgText.classList.add('chatbox__message-text', 'rounded-md', 'p-2', 'ml-4', 'mr-1', 'px-4', 'bg-blue-600', 'bg-opacity-10', 'border', 'border-neutral-600', 'border-opacity-50', 'max-w-[90%]', 'w-auto');
    msgText.innerText = message;
    msgDiv.appendChild(msgText);
    chatboxMessages.appendChild(msgDiv);
    // Save human message in history
    // chatHistory.push({ type: 'human', content: msgDiv.innerHTML });
    saveChatHistory();
}

async function addMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbox__message', sender === 'bot' ? 'chatbox__message--bot' : 'chatbox__message--human', 'mb-2', 'rounded-md', 'p-2', 'ml-1', 'mr-4', 'px-4', 'bg-blue-600', 'bg-opacity-10', 'border', 'border-neutral-600', 'border-opacity-50', 'max-w-[90%]');
    // Show loader while fetching bot response
    msgDiv.innerHTML = `<div class="loader"></div>`;
    chatboxMessages.appendChild(msgDiv);
    try {
        // ...API call logic...
        const res = await axios.post('/chat', { message: message, data: JSON.parse(localStorage.getItem('expenses')) });
        const data = res.data.response;
        let date = new Date()
        //! Turning 24 hr to 12 hr AM PM format // 
        let time24 = toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[0] + ':' + toISOStringWithTimezone(date).split('T')[1].split('+')[0].split(':')[1]
        let time = (parseInt(time24.split(':')[0]) > 12 ? parseInt(time24.split(':')[0]) - 12 : parseInt(time24.split(':')[0])) + ':' + time24.split(':')[1] + ' ' + (parseInt(time24.split(':')[0]) >= 12 ? 'PM' : 'AM')
        msgDiv.innerHTML = `<div class="text-mainText opacity-50 text-sm my-2">
            <span class="bg-neutral-600 bg-opacity-30 rounded-full p-1 px-4">${time}</span>
          </div>
          <div>${data}</div>`;
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
        // Save bot message in history
        saveChatHistory();
        return data;
    } catch (err) {
        console.log(err);
        msgDiv.remove();
        throw new Error('Failed to fetch data from backend');
    }
}

sendButton.addEventListener('click', async () => {
    const message = chatboxInput.value;
    if (message === '') return;
    addHumanMsg(message);
    await addMessage('bot', message);
    chatboxInput.value = '';
});

window.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const message = chatboxInput.value;
        if (message === '') return;
        addHumanMsg(message);
        await addMessage('bot', message);
        chatboxInput.value = '';
    }
});

// Load persisted chat history on page load
loadChatHistory();

