import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/environment-config/database.interface';
import { EnvVariableType } from './env-variable';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService<EnvVariableType>) {}

  getDatabaseHost(): string {
    return this.configService.getOrThrow<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.getOrThrow<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.getOrThrow<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.getOrThrow<string>('DATABASE_PASSWORD');
  }

  getDatabaseSchema(): string {
    return this.configService.getOrThrow<string>('DATABASE_SCHEMA');
  }
}
