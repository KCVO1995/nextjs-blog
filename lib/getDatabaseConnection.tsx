import config from '../ormconfig.json';
import {Post} from '../src/entity/Post';
import {Comment} from '../src/entity/Comment';
import {User} from '../src/entity/User';
import {getConnectionManager, createConnection} from 'typeorm';
import 'reflect-metadata';

const getDatabaseConnection = async () => {
  const manage = getConnectionManager()
  if (manage.has('default')) await manage.get('default').close()
  // @ts-ignore
  return createConnection({ ...config, entities: [Post, Comment, User] });
}

export default getDatabaseConnection
