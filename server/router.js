import AuthRouter from './core/modules/auth/routes';

export default function routes(app) {
  app.use('/api/user', AuthRouter);
}
