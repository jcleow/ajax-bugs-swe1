import db from './models/index.mjs';
import bugs from './controllers/bugs.mjs';
import features from './controllers/features.mjs';
import users from './controllers/users.mjs';

// import your controllers here

export default function routes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = bugs(db);
  app.get('/', bugsController.show);
  app.post('/createBug', bugsController.create);
  app.get('/bugs', bugsController.index);

  const featuresController = features(db);
  app.get('/features', featuresController.index);

  const usersController = users(db);
  app.get('/user', usersController.show);
  app.get('/user/new', usersController.newForm);
  app.post('/user/login', usersController.login);
}
