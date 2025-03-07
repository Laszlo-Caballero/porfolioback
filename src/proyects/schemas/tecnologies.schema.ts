import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TecnologyDocument = HydratedDocument<Tecnology>;

@Schema()
export class Tecnology {
  @Prop({ required: true })
  urlImage: string;

  @Prop({ required: true })
  name: string;
}

export const TecnologySchema = SchemaFactory.createForClass(Tecnology);
