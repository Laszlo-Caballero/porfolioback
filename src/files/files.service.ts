import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { v2 as cloudinary, DeleteApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './schema/Image.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async create(file: Express.Multer.File) {
    try {
      const res = await new Promise<CloudinaryResponse>((res, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error || !result) {
              return reject(error);
            }
            res(result);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      const newImage = await this.imageModel.create({
        name: res.public_id,
        url: res.url,
      });

      const savedImage = await newImage.save();

      return {
        message: 'File uploaded successfully',
        body: savedImage,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const findImage = await this.imageModel.findOne({ name: id });
      if (!findImage) {
        throw {
          message: 'Image not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.imageModel.deleteOne({
        name: id,
      });

      const res = await new Promise<DeleteApiResponse>((res, reject) => {
        cloudinary.uploader.destroy(id, (error, result) => {
          if (error || !result) {
            return reject(error);
          }
          res(result);
        });
      });

      return {
        message: 'File deleted successfully',
        body: res,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Error deleting file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
