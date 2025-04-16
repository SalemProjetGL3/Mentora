import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roadmap, RoadmapDocument } from './schemas/roadmap.schema';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectModel(Roadmap.name) private roadmapModel: Model<RoadmapDocument>,
  ) {}

  async generateExternalRoadmap(prompt: string): Promise<any> {
    const pythonApiUrl = process.env.API_URL;
    const endpoint = `${pythonApiUrl}/generate_roadmap`;
    try {
      const response = await axios.post(endpoint, { prompt });
      if (response.data && response.data.roadmap) {
        return response.data.roadmap;
      } else {
        throw new BadRequestException("La roadmap n'a pas pu être générée.");
      }
    } catch (error) {
      throw new BadRequestException("Erreur lors de l'appel à l'API Python: " + error.message);
    }
  }

  async createRoadmap(createRoadmapDto: CreateRoadmapDto, userId: string): Promise<Roadmap> {
    const { prompt } = createRoadmapDto;
    const count = await this.roadmapModel.countDocuments({ userId });
    if (count >= 3) {
      throw new BadRequestException("Vous avez atteint le nombre maximum de roadmaps. Veuillez supprimer une roadmap existante avant d'en créer une nouvelle.");
    }
    const generatedContent = await this.generateExternalRoadmap(prompt);
    const roadmap = new this.roadmapModel({
      userId,
      prompt,
      content: generatedContent, 
      createdAt: new Date(),
    });

    return roadmap.save();
  }
}
