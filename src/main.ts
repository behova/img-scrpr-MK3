import 'dotenv/config';
import validateEnv from './utils/ValidateEnv.js';
import App from './app.js';

const env = validateEnv();

const app = new App(
  env.SCRAPER_SCHEDULE,
  env.CULL_SCHEDULE,
  env.DELAY_MAX,
  env.DELAY_MIN,
);

app.initScraperSchedule();
app.initCullSchedule();
