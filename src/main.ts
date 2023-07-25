import './style.css'
import { connectToServer } from './sockect-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - Client</h1>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Conect</button>
    </br>

    <ul id="clientes-ul"></ul>

    
    <form id="message-form">
    <input placeholder="message" id="message-input" />
    </form>
    
    <h3>Mensajes</h3>
    <ul id="messages-ul"></ul>

    <span id="server-status"></span>
  </div>
`

const jwtToken = window.document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = window.document.querySelector('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) {
    return window.alert('Enter a valid JWT');
  }
  connectToServer(jwtToken.value.trim());
});