import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyect } from './schemas/proyect.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProyectsService {
  constructor(
    @InjectModel(Proyect.name) private proyectModel: Model<Proyect>,
  ) {}

  async create(createProyectDto: CreateProyectDto) {
    const id = uuid();

    const newProyect = await this.proyectModel.create({
      proyectId: id,
      ...createProyectDto,
    });

    const saveProyect = await newProyect.save();

    return {
      message: 'Proyect created',
      body: saveProyect,
      status: HttpStatus.OK,
    };
  }

  async findAll() {
    const proyects = await this.proyectModel.find();

    return {
      message: 'All proyects',
      body: proyects,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const proyect = await this.proyectModel.findOne({ proyectId: id }).exec();

    if (!proyect)
      throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);

    return {
      message: 'Proyect found',
      body: proyect,
      status: HttpStatus.OK,
    };
  }

  async update(id: string, updateProyectDto: UpdateProyectDto) {
    const findProyect = await this.proyectModel
      .findOne({ proyectId: id })
      .exec();

    if (!findProyect)
      throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);

    const proyect = await this.proyectModel.updateOne(
      {
        proyectId: id,
      },
      updateProyectDto,
    );

    return {
      message: 'Proyect updated',
      body: proyect,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const findProyect = await this.proyectModel
      .findOne({ proyectId: id })
      .exec();

    if (!findProyect)
      throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);

    await this.proyectModel.deleteOne({ proyectId: id }).exec();

    return {
      message: 'Proyect deleted',
      status: HttpStatus.OK,
      body: null,
    };
  }
}
