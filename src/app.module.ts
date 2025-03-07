import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceModule } from './experience/experience.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { ProyectsModule } from './proyects/proyects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_DB_NAME}`,
    ),
    ExperienceModule,
    FilesModule,
    AuthModule,
    ProyectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
