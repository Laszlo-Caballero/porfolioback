import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './schema/experience.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name) private experiencieModel: Model<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const id = uuid();

    const createdExperience = await this.experiencieModel.create({
      ...createExperienceDto,
      experienceId: id,
    });

    const saveExperience = await createdExperience.save();
    return {
      message: 'Experience created',
      body: saveExperience,
      status: HttpStatus.OK,
    };
  }

  async findAll() {
    const experiences = await this.experiencieModel.find();

    return {
      message: 'All experiences',
      body: experiences,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const experience = await this.experiencieModel
      .findOne({ experienceId: id })
      .exec();

    if (!experience) {
      throw new HttpException('Experience not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Experience found',
      body: experience,
      status: HttpStatus.OK,
    };
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experiencieModel.findOne({
      experienceId: id,
    });
    if (!experience)
      throw new HttpException('Experience not found', HttpStatus.NOT_FOUND);

    await this.experiencieModel.updateOne(
      { experienceId: id },
      updateExperienceDto,
    );

    return {
      message: 'Experience updated',
      body: {
        response: 'Experience updated',
      },
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const experience = await this.experiencieModel.findOne({
      experienceId: id,
    });
    if (!experience) {
      throw new HttpException('Experience not found', HttpStatus.NOT_FOUND);
    }

    await this.experiencieModel.deleteOne({ id });

    return {
      message: 'Experience deleted',
      body: {
        response: 'Experience deleted',
      },
      status: HttpStatus.OK,
    };
  }
}
