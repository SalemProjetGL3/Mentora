import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AppService } from 'src/app.service';

@WebSocketGateway({ cors: true }) 
export class ChatGateway {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }

  @SubscribeMessage('question') 
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received from client:', data);

    // Parse if data is a string
    let parsedData = data;
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        client.emit('error', 'Invalid JSON format');
        console.error('Invalid JSON format');
        return;
      }
    }

    const { question, lesson, course } = parsedData;

    if (question && lesson && course) {
      this.appService.askPythonBot(question, lesson, course)
        .then((response) => {
          console.log('Response from Python:', response);
          client.emit('response', response);
        })
        .catch((error) => {
          client.emit('error', 'Error occurred while processing');
          console.error('Error occurred while processing:', error);
        });
    } else {
      client.emit('error', 'Invalid message format');
      console.error('Invalid message format');
    }
  }
}
