import { CONFIG } from './config';
import { UsersRepo } from './users.repository';
import { UsersRouter } from './users.router';
import { UsersServer } from './users.server';
import { authenticationMiddleware } from './users.authorization.middleware';

export class UsersModule {
  // require options
  server: UsersServer;
  router: UsersRouter;
  repository: UsersRepo;
  db: any;
  // config options
  serverConfig: CONFIG.IServerConfig;
  // optionals
  serviceName?: string = 'UsersModule';

  constructor(datas: {
    serverConfig: CONFIG.IServerConfig;
    serviceName?: string;
  }) {
    Object.assign(this, datas);
  }

  async init() {
    await this._initServer().catch(err => console.log(err));
    await this._initRepo().catch(err => console.log(err));
    await this._initRouter().catch(err => console.log(err));
    // bootstrap All
    await this.server.addDefaultRoute().catch(err => console.log(err));
    await this.server.createHttpServer().catch(err => console.log(err));
    await this.server.bootstrap().catch(err => console.log(err));
    await this.server.connectApiGateway().catch(err => console.log(err));
  }

  private async _initServer(): Promise<UsersServer> {
    // init server
    if (!this.serverConfig) return Promise.reject({code: 500, message: 'Server need serverConfig'});
    return this.server = new UsersServer({
      serverConfig: this.serverConfig,
      serviceName: this.serviceName
    });
  }

  private async _initRepo(): Promise<UsersRepo> {
    // init repository
    if (!this.db || !this.serverConfig) return Promise.reject({code: 500, message: 'Repository need DB'});
    return this.repository = await new UsersRepo().init(
      this.db,
      this.serverConfig
    );
  }

  private async _initRouter(): Promise<UsersRouter> {
    // init router
    if (!this.repository) return Promise.reject({code: 500, message: 'Router need repository instance.'});
    this.router = new UsersRouter({
      repo: this.repository,
      serverConfig: this.serverConfig,
      middlewares: [authenticationMiddleware.authenticatedRoute]
    });
    const routes =  await this.router.getRoutes().catch(err => err);
    if (routes) this.server.app.use('/api/v2/', routes);
    return this.router;
  }
}