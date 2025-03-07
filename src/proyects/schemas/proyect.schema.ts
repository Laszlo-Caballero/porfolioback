import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tecnology } from './tecnologies.schema';
import { HydratedDocument } from 'mongoose';

export type ProyectDocument = HydratedDocument<Proyect>;

@Schema()
export class Proyect {
  @Prop({ required: true })
  proyectId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  urlImage: string;

  @Prop({
    required: true,
    type: [Tecnology],
  })
  tecnologies: Tecnology[];
}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);
