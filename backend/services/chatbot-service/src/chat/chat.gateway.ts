import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import WebSocket from 'ws';
  
  @WebSocketGateway({ namespace: '/chatbot', cors: { origin: '*' } })
  export class ChatGateway {
    @WebSocketServer() server: Server;
  
    constructor() {
      console.log('PY_WS_URL =', process.env.PY_WS_URL);
    }
  
    @SubscribeMessage('chat')
    async onChat(
      @MessageBody() payload: { question: string; lesson: string; course: string },
      @ConnectedSocket() client: Socket,
    ) {
      const url = process.env.PY_WS_URL;  
      if (!url) {
        client.emit('error', 'PY_WS_URL not set');
        return;
      }
  
      const ws = new WebSocket(url);
  
      ws.on('open', () => {
        ws.send(JSON.stringify({
          question: payload.question,
          lesson: payload.lesson,
          course: payload.course,
        }));
      });
  
      ws.on('message', (msg) => {
        let json;
        try {
          json = JSON.parse(msg.toString());
        } catch {
          client.emit('error', 'Invalid JSON from Python chatbot');
          ws.close();
          return;
        }
        client.emit('reply', { reply: json.response });
        ws.close();
      });
  
      ws.on('error', (err) => {
        client.emit('error', `Python WS error: ${err.message}`);
      });
    }
  }
  