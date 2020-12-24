import db from './models/index.mjs';
import bugs from './controllers/bugs.mjs';
import features from './controllers/features.mjs';
import users from './controllers/users.mjs';

// import your controllers here

export default function routes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const BugsController = bugs(db);
  app.get('/', BugsController.show);
  app.post('/createBug', BugsController.create);
  app.get('/bugs', BugsController.index);

  const FeaturesController = features(db);
  app.get('/features', FeaturesController.index);

  const UsersController = users(db);
  app.get('/user', UsersController.show);
  app.get('/user/new', UsersController.newForm);
  app.post('/user/login', UsersController.login);
}
