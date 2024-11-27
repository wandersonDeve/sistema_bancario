import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const validator = Joi.object({
  PORT: Joi.number().default(3000),
  TYPEORM_URL: Joi.string().required(),
  TYPEORM_SSL_MODE: Joi.boolean().default(false),
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(20),
});

export const envConfig: ConfigModuleOptions = {
  validationSchema: validator,
  isGlobal: true,
  cache: true,
  envFilePath: ['.env', '.env.dev', '.env.hml'],
};
