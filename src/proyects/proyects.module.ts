import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from './schemas/proyect.schema';
import { Tecnology, TecnologySchema } from './schemas/tecnologies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Proyect.name,
        schema: ProyectSchema,
      },
      {
        name: Tecnology.name,
        schema: TecnologySchema,
      },
    ]),
  ],
  controllers: [ProyectsController],
  providers: [ProyectsService],
})
export class ProyectsModule {}
