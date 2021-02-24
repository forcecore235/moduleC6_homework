const sendBtn = document.querySelector('.send-button')
const chatWindow = document.querySelector('.chat-window')
const inputText = document.querySelector('.input-text')
const locationBtn = document.querySelector('.position-button')

const webSocketUri = 'wss://echo.websocket.org/'
let websocket


window.addEventListener('load', () => {
    openWS(webSocketUri)
})

window.addEventListener('beforeunload', () => {
    closeWS()
})

sendBtn.addEventListener('click', () => {
    sendWS(inputText.value)
    chatWindow.scrollTop = chatWindow.scrollHeight
})

locationBtn.addEventListener('click', () => {
 if (!navigator.geolocation) {
     chatWindow.innerHTML += `<div class="request dialog"><div class="name-chat">Location</div>Geolocation service is not supported by your browser.</div>`
     chatWindow.scrollTop = chatWindow.scrollHeight
 } else {
     navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
 }
})

function successLocation(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    websocket.send(position.coords)
    chatWindow.innerHTML += `<div class="request dialog"><div class="name-chat">OpenStreetMap</div><a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Your location.</a></div>`
    chatWindow.scrollTop = chatWindow.scrollHeight
}

function errorLocation() {
    chatWindow.innerHTML += `<div class="request dialog"><div class="name-chat">Location</div>Location Error.</div>`
    chatWindow.scrollTop = chatWindow.scrollHeight
}

function messageInChat(message) {
    chatWindow.innerHTML += `<div class="message dialog"><div class="name-chat">You</div>${inputText.value}</div>`
    chatWindow.scrollTop = chatWindow.scrollHeight
}

function openWS(uri) {
    websocket = new WebSocket(uri)

    websocket.onmessage = (event) => {
        if (event.data !== '[object GeolocationCoordinates]') {
            chatWindow.innerHTML += `<div class="request dialog"><div class="name-chat">WebSocket API</div>${event.data}</div>`
            chatWindow.scrollTop = chatWindow.scrollHeight
        }
    }
}

function sendWS(message) {
    messageInChat(inputText.value)
    websocket.send(inputText.value)
}

function closeWS() {
    websocket.close()
    websocket = null
}