import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/environment-config/database.interface';
import { EnvVariableType } from './env-variable';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService<EnvVariableType>) {}

  public getDatabaseHost(): string {
    return this.configService.getOrThrow<string>('DATABASE_HOST');
  }

  public getDatabasePort(): number {
    return this.configService.getOrThrow<number>('DATABASE_PORT');
  }

  public getDatabaseName(): string {
    return this.configService.getOrThrow<string>('DATABASE_NAME');
  }

  public getDatabaseUser(): string {
    return this.configService.getOrThrow<string>('DATABASE_USER');
  }

  public getDatabasePassword(): string {
    return this.configService.getOrThrow<string>('DATABASE_PASSWORD');
  }

  public getDatabaseSchema(): string {
    return this.configService.getOrThrow<string>('DATABASE_SCHEMA');
  }

  public getServerPort(): number {
    return this.configService.getOrThrow<number>('SERVER_PORT');
  }

  public getRemoveOldBackupFilesDays(): number {
    return this.configService.getOrThrow<number>(
      'REMOVE_OLD_BACKUP_FILES_DAYS',
    );
  }
}
