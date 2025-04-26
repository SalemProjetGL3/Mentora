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
  ) {
    console.log('→ Python API URL =', process.env.API_URL);
  }


  async generateExternalRoadmap(prompt: string): Promise<any> {
    const endpoint = `${process.env.API_URL}/generate_roadmap`;
    console.log('→ Calling Python API at', endpoint, 'with prompt:', prompt);
  
    try {
      const { data, status } = await axios.post(endpoint, { prompt });
      return data;
    } catch (err: any) {
      if (err.response) {
        throw new BadRequestException(
          `Python API ${err.response.status}: ${JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
          throw new BadRequestException(
            'Aucune réponse de l’API Python (vérifiez l’URL et le réseau).'
          );
      } else {
          throw new BadRequestException('Erreur Axios: ' + err.message);
      }
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
