export const config = {
  mysql_config: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs_prod',
    autoLoadEntities: true,
    synchronize: true,
  },
};
