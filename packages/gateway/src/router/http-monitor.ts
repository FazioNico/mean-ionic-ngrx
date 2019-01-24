import * as express from 'express';
import { IRepository } from '../repository';

export const monitorService = (repo: IRepository) => {
    // TODO: return error
    if (!repo) {
        console.log('[error]: no repository available');
        return express.Router();
    }
    return express.Router()
        .get('/config',
            async(req: express.Request, res: express.Response, next: express.NextFunction
        ) => {
            await repo.config()
                .then(() => res.status(200).json({code: 200, message: 'success'}))
                .catch(err => next(err));
        })

        .get('/serviceListAll',
             async(req: express.Request, res: express.Response, next: express.NextFunction
        ) => {
            await repo.findAll()
                .then(result => (console.log('Registered api route: %j', result), result))
                .then(result => res.status(200).json({code: 200, message: result}))
                .catch(err => next(err));
        })

        .post('/serviceUp',
              async(req: express.Request, res: express.Response, next: express.NextFunction
        ) => {
            const { service = null } = req.body || null;
            // TODO: return error
            // console.log('service---', req.body);
            if (!service) return next({code: 400, message: 'Unexisting routes'});
            const {
                // extracting data from Object `container`
                label = null,
                host = null,
                port = null
            } = service;
            // TODO: return error
            if (!label || !host || !port) return next('');
            // build route Object to store into database
            const route = {label, host, port};
            await repo.add(route)
                // .then(result => (console.log('Update api route: %j', result), result))
                .then(result => res.status(200).json({code: 200, message: result}))
                .catch(err => next(err));
        })

        .post('/serviceDown',
            async(req: express.Request, res: express.Response, next: express.NextFunction
        ) => {
            const {container: {Actor: ID = null} = {}} = req.body;
            // TODO: return corresct error
            if (!ID) return next('unexisting ID');
            await repo.remove(ID)
                .then(result => console.log('Removed api route: %j', result))
                .then(result => res.status(200).json({code: 200, message: result}))
                .catch(err => next(err));
        });
};
