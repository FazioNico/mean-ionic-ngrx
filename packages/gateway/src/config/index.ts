
import { dbSettings, serverConfig } from './config';
import * as db from './redis';

export const CONFIG = Object.assign({}, {dbSettings, serverConfig, db});
