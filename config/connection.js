const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const { URL } = require('url');
  // const url = "mysql://b5158a0b83c7d7:36f89d54@us-cdbr-east-06.cleardb.net/heroku_cdd542e963f6ec2?reconnect=true";
  const url = process.env.CLEARDB_DATABASE_URL;
  const parsedUrl = new URL(url);

  sequelize = new Sequelize(
    parsedUrl.pathname,
    parsedUrl.username,
    parsedUrl.password,
    {
      host: parsedUrl.hostname,
      dialect: parsedUrl.protocol,
      port: parsedUrl.port
    }
  );
  
  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USER,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: 'us-cdbr-east-06.cleardb.net',
  //     dialect: 'mysql',
  //     port: 3306
  //   }
  // );
}

module.exports = sequelize;
