import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { expressjwt } from 'express-jwt';

import { fileURLToPath } from 'url';
import { indexRoutes } from './routes/index-routes.js';
import { todoRoutes } from './routes/todo-routes.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());
const jwtSecret =
  'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set('jwt-secret', jwtSecret); // secret should be in a config file - or better be a private key!
app.set('jwt-sign', { expiresIn: '1d', audience: 'self', issuer: 'todo' });
app.set('jwt-validate', {
  secret: jwtSecret,
  audience: 'self',
  issuer: 'todo',
  algorithms: ['HS256'],
});

app.get('/', (req, res) => {
  res.sendFile('/html/index.html', { root: `${__dirname}/public/` });
});
app.use(expressjwt(app.get('jwt-validate')).unless({ path: [/\/login*/] })); // after this middleware a token is required!
app.use((req, res, next) => {
  console.log(req.auth || 'no user');
  next();
});
app.use('/', indexRoutes);
app.use('/todos', todoRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No token / Invalid token provided');
  } else {
    next(err);
  }
});
