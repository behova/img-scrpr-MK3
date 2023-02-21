import 'dotenv/config';
import validateEnv from './utils/ValidateEnv.js';
import App from './app.js';

validateEnv();

const app = new App(process.env.SCRAPER_SCHEDULE, process.env.CULL_SCHEDULE);

app.initScraperSchedule();
app.initCullSchedule();
