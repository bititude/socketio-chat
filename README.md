
# Socket io chat

<p align="center">A custom socket io server implementation created for chat applications.</p>
<p align="center">
  <a aria-label=">License" href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green">
  </a>
  <a aria-label="NPM Package" href="https://www.npmjs.com/package/@bititude/socketio-chat">
    <img alt="" src="https://img.shields.io/badge/NPM%20Package-0.0.2-red">
  </a>
  <a aria-label="Socket.io" href="https://socket.io/docs/v4/">
    <img alt="" src="https://img.shields.io/badge/Socket.IO-4.1.2-black">
  </a>
</p>

## Installation

Install the service with npm

```bash
  npm i @bititude/socketio-chat
```
    
## Usage/Examples

### With Express app

```javascript
const express = require('express');
const { ChatService } = require('@bititude/socketio-chat');
const http = require('http');

const app = express();
const server = http.createServer(app);

new ChatService({
    srv: server,
});

server.listen(3000);
```

### Without a server like express

```javascript
const {ChatService} = require('@bititude/socketio-chat');

new ChatService({
    srv: 3000,
});
```

  
## Options

`ChatService` accepts different options


| Name                  | Type              | Required   | Description                                       |
| --------------------- | ----------------- | ---------- | ------------------------------------------------- |
| `srv`                 | Number/HttpServer | Yes        | http server, port                                 |
| `log`                 | Boolean           | No         | Enable/Disable logs default `true`   |
| `onUserConnect`       | Function          | No         | On User connection event listener |
| `onOnlineStatusSend`  | Function          | No         | On User online status send event listener |
| `onRoomsJoined`       | Function          | No         | On Rooms joined by a user event listener |
| `onMessageRecieved`   | Function          | No         | On message recieved event listener |
| `authenticateUser`    | Function          | No         | Authentication method        |


Example

```javascript
new ChatService({
    srv: 3000,
    onUserConnect: (user: User)=>{
      console.log(user)
    },
    onOnlineStatusSend: (connected: boolean)=>{
      console.log(`User is ${connected? 'connected': 'disconnected'}`)
    },
    onRoomsJoined: (rooms: string[])=>{
      console.log('user joined rooms:', rooms)
    },
    onUserConnect: (message: Message)=>{
      console.log(`A new message recieved from ${message.from}`,message.content)
    },
    authenticateUser: (auth)=>{
      if(auth.token === '#token'){
        return user;
      }
      return null
    }
});
``` 

**_NOTE:_** if `authenticateUser` is not passed socketio connection won't be authenticated.
## Related

Read more about

[Socket.io](https://socket.io/docs/v4/)
