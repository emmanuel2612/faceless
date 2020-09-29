window.onload = () =>{

    const socket = io('http://localhost:3000');
    const messageContainer = document.getElementById("message-container");
    const messageForm = document.getElementById("send-container");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button")

    const messageTemplate = document.getElementById("message-template");
    const messageInstance = document.importNode(messageTemplate.content, true); /*Import template into the DOM*/
    const messageText = messageInstance.querySelector('p');

    /// const name = prompt('What is your name?') 
  
    socket.emit('new-user', name)
    

    socket.on('chat-message', data => {
        // appendMessage(data)

        var messageNode = document.createElement("div");
        messageNode.className = "message"

        messageNode.innerHTML = data

        messageContainer.appendChild(messageNode)

        messageNode.style.display = "inline-block";

        setTimeout(() => {
            messageNode.style.opacity = "1";
        }, 50);

        
    });

     /* socket.on('user-connected', name => {
        appendMessage(`${name} connected`)
    }); */

    messageForm.onsubmit = (e) => {
        e.preventDefault()
        const message = messageInput.value
        socket.emit('send-chat-message', message)
        messageInput.value = ' '
        messageInput.placeholder = 'Start a new message'
        sendOne.src = "icons/send-1.png"
    }

    const appendMessage = (message) => {
        const messageElement = document.createElement('div')
        messageElement.innerText = message
        messageContainer.append(messageElement)
    }

    



  
    const sendOne = document.querySelector("#send-icon");

    messageInput.onkeyup = () => {
        if (messageInput.value.length > 0){
            sendOne.src = "icons/send-2.png"
        }

        else{
            sendOne.src = "icons/send-1.png"
        }
    }


}