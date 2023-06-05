declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }

  interface ProcessEnv extends ReservedEnvironmentVariables {
    [key: string]: null;
  }
}
declare interface ReservedEnvironmentVariables {
  /**
   * Server's running variables
   */
  NODE_ENV: string;
  SERVER_PORT: number;

  /**
   * Database's connection variables
   */
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_SCHEMA: string;

  /**
   * Backup variables
   */
  REMOVE_OLD_BACKUP_FILES_DAYS: number;
}
