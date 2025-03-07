import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExperiencieDocument = HydratedDocument<Experiencie>;

@Schema()
export class Experiencie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  urlImage: string;

  @Prop({ required: true })
  time: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experiencie);
