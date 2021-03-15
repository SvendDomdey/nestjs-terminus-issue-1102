import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

const user = 'dbUser';
const pw = 'doNotUseMe';
const host = 'cluster0.huuzy.mongodb.net';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${user}:${pw}@${host}/photo?retryWrites=true`,
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
