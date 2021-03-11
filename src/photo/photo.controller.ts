import { Body, Controller, Get, Post } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  getPhotos(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post()
  create(@Body() photo: Photo) {
    return this.photoService.create(photo);
  }
}
