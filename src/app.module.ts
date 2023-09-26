import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config';
import { PostService } from './database/post/post.service';
import entitys from './database/entitys';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          type: 'mysql',
          entities: [...entitys],
          ...config.mysql_config,
        };
      },
    }),
    TypeOrmModule.forFeature([...entitys]),
  ],
  controllers: [AppController],
  providers: [PostService],
})
export class AppModule {}
