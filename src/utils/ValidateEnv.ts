import { cleanEnv, str, port, num } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    DATABASE_URL: str(),
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    IMAGES_PATH: str(),
    SCRAPER_SCHEDULE: str(),
    CULL_SCHEDULE: str(),
    DELAY_MIN: num(),
    DELAY_MAX: num(),
    SIZE_TO_CULL: num(),
    PORT: port({ default: 3000 }),
  });
}

export default validateEnv;
