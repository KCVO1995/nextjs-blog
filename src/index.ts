import 'reflect-metadata';
import {createConnection} from 'typeorm';

createConnection().then(async connection => {
  console.log(connection)
  await connection.close()
}).catch(error => console.log(error));
