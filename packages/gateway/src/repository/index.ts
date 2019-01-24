import * as redis from 'redis';

export interface IRepository {
  findAll: () => Promise<any>;
  setAll: (data) => Promise<any>;
  find: (key) => Promise<any>;
  add: (data) => Promise<any>;
  remove: (data) => any;
  config: () => any;
}
const repository = (db: redis.RedisClient): IRepository => {
  const collection = 'ROUTES';

  // const findAll = async(key) => await db.get(key)
  const config = (data) => {
    return new Promise((resolve, reject) => {
      db.del(collection, (err, res) =>
        (err)
          ? reject(err)
          : resolve(res)
      );
    });
  };


  const setAll = (data) => {
    return new Promise((resolve, reject) => {
      db.set(collection, JSON.stringify(data), (err, res) =>
        (err)
          ? reject(err)
          : resolve(res)
      );
    })
    .then(_ => {
      return new Promise((resolve, reject) => {
        db.get(collection, (err, result) => {
          resolve(JSON.parse(result));
        });
      });
    });
  };

  const findAll = () => {
    return new Promise((resolve, reject) => {
      db.get(collection, (err, res) =>
        (err)
          ? reject(null)
          : resolve((<any[]>JSON.parse(res)))
      );
    });
  };

  const find = (path) => {
    return new Promise((resolve, reject) => {
      db.get(collection, (err, res) =>
        (err)
          ? reject(null)
          : resolve(res)
      );
    })
    .then((res: string) => {
        if (res) {
          return (<any[]>JSON.parse(res)).filter(r => r.label === path)[0];
        }
        else {
          return null;
        }
    });
  };

  const add = (data) =>    {
    if (!data) return Promise.reject('unexisting data to add...');
    return new Promise((resolve, reject) => {
      db.get(collection, (err, res) =>
        (err)
          ? reject(err)
          : resolve(res)
      );
    })
    .then((res: any) => {
      let datasToStore = (<any[]>JSON.parse(res)) || [];
      if (datasToStore.find(r => r.label === data.label)) {
        datasToStore = datasToStore.filter(r => r.label !== data.label);
      }
      datasToStore.push(data);
      return setAll(datasToStore);
    });
  };


  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.get(collection, (err, res) =>
        (err)
          ? reject(err)
          : resolve(res)
      );
    })
    .then((res: any) => {
      console.log('remove id ->', id);
      const datasToStore = (<any[]>JSON.parse(res)).filter(r => r.id !== id);
      return  setAll(datasToStore);
    });
  };

  const disconnect = async() => {
    await db.quit();
  };

  return Object.create({
    findAll,
    setAll,
    find,
    remove,
    add,
    config
  });
};

export const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(connection));
  });
};
