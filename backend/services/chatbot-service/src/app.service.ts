import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  private ws: WebSocket;
  private lastResponseResolver: ((value: string) => void) | null = null;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const pythonWsUrl = this.configService.get<string>('PYTHON_WS_URL');
    this.ws = new WebSocket.WebSocket(pythonWsUrl);

    this.ws.on('open', () => {
      console.log('✅ Connected to Python WebSocket service');
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      const response = data.toString();
      console.log('📨 Message from Python service:', response);

      if (this.lastResponseResolver) {
        this.lastResponseResolver(response);
        this.lastResponseResolver = null;
      } else {
        console.warn('⚠️ No pending resolver to handle Python response');
      }
    });

    this.ws.on('error', (err) => {
      console.error('❌ WebSocket error:', err);
    });

    this.ws.on('close', () => {
      console.warn('🔌 Python WebSocket connection closed');
    });
  }

  async askPythonBot(
    question: string,
    lesson = 'Unknown Lesson',
    course = 'Unknown Course'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        return reject(new Error('Python WebSocket is not connected.'));
      }

      this.lastResponseResolver = resolve;

      const payload = {
        question,
        lesson,
        course,
      };

      console.log('📤 Sending payload to Python WebSocket:', payload);

      this.ws.send(JSON.stringify(payload));
    });
  }
}
