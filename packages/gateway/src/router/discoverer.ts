import { monitorService } from './http-monitor';

export const discoverRoute = (options) => {
  const {repo} = options;
  return monitorService(repo);
};
