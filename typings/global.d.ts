import type { Payload } from '../src/auth';

export declare global {
  type AnyObject = Record<string, unknown>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
    }
  }

  namespace Express {
    interface Request {
      // customProps of pino-http
      customProps: {
        user_id: string | number;
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Payload {}
  }
}
