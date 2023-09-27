import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../config';
import entitys from './entitys';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config = await configuration();
        return {
          type: 'mysql',
          entities: [...entitys],
          ...config.mysqlConfig,
        };
      },
    }),
    TypeOrmModule.forFeature([...entitys]),
  ],
  exports: [TypeOrmModule],
})
export class DBModule {}
