import { Manager, Socket } from 'socket.io-client';

let socket: Socket;
const ULR_SOCKET = 'http://localhost:3000/socket.io/socket.io.js';

export const connectToServer = (token: string) => {
  const manager = new Manager(ULR_SOCKET, {
    extraHeaders: {
      hola: 'Mundo',
      autentication: token
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListener();

}

const addListener = () => {

  const serverStatusLabel = window.document.querySelector("#server-status")!;
  const clientsUL = window.document.querySelector("#clientes-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Conectado';
  });
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Desconectado';
  });

  socket.on('clients-updated', (clients: string[]) => {
    window.console.log({ clients });
    let clientHtml = '';
    clients.forEach((clientId) => (clientHtml += `<li>${clientId}</li>`));
    clientsUL.innerHTML = clientHtml;
  });

  messageForm.addEventListener('submit', (event) => {
    event?.preventDefault();
    if (messageInput.value.trim().length <= 0) return;
    socket.emit('message-from-client', {
      id: 'YO!!',
      message: messageInput.value
    });
    messageInput.value = '';
  });

  socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
    const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);

  });

}