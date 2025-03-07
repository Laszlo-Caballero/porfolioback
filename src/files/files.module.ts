import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schema/Image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryProvider],
})
export class FilesModule {}
