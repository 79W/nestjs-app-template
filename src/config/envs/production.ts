export const config = {
  mysqlConfig: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs_prod',
    autoLoadEntities: true,
    synchronize: true,
  },
  redisConfig: {
    host: 'localhost',
    port: 6379,
    password: 'redis',
    db: 0,
  },
};
