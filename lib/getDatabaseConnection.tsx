import config from '../ormconfig.json';
import {Post} from '../src/entity/Post';
import {Comment} from '../src/entity/Comment';
import {User} from '../src/entity/User';
import {getConnectionManager} from 'typeorm';

const getDatabaseConnection = () => {
  const manage = getConnectionManager()
  if (manage.has('default') && manage.get('default').isConnected) {
    return manage.get('default')
  } else {
    // @ts-ignore
    return manage.create({
      ...config,
      entities: [Post, Comment, User]
    })
  }
}

// @ts-ignore
export default getDatabaseConnection
