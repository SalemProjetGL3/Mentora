// src/shared/id-generator.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Counter } from './schemas/counter.schema';

@Injectable()
export class IdGeneratorService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async getNextId(entityName: string): Promise<number> {
    const result = await this.counterModel.findOneAndUpdate(
      { _id: entityName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return result.seq;
  }
}