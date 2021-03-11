import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://dbUser:doNotUseMe@cluster0.huuzy.mongodb.net/photo?retryWrites=true`,
      entities: [Photo],
      synchronize: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
    PhotoModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
