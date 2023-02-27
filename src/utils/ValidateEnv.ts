import { cleanEnv, str, port, num, CleanedEnvAccessors } from 'envalid';

function validateEnv(): Readonly<
  {
    DATABASE_URL: string;
    NODE_ENV: string;
    IMAGES_PATH: string;
    SCRAPER_SCHEDULE: string;
    CULL_SCHEDULE: string;
    DELAY_MIN: number;
    DELAY_MAX: number;
    SIZE_TO_CULL: number;
    PORT: number;
  } & CleanedEnvAccessors
> {
  const env = cleanEnv(process.env, {
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
  return env;
}

export default validateEnv;
