import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import LicensesRoute from './routes/licenses.route';
import validateEnv from './utils/validateEnv';
import WebhookRoute from './routes/webhook.route';


validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new LicensesRoute(), new WebhookRoute()]);
app.start();