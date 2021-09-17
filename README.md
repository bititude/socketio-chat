
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

  
## Features

- Message Events
- User connection events
- User authentication

## Related

Read more about

[Socket.io](https://socket.io/docs/v4/)
