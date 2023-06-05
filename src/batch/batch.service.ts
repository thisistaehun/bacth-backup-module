import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as childProcess from 'child_process';
import { EnvironmentConfigService } from 'src/environment-config/environment-config.service';
import { LoggerService } from 'src/logger/logger.service';
import { backupDatabaseScript } from 'src/scripts/backup-database';
import { removeOldBackUpFilesDaysScript } from 'src/scripts/remove-old-back-up-files-days';

@Injectable()
export class BatchService implements OnApplicationBootstrap {
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
    private readonly logger: LoggerService,
  ) {}

  // 매일 0시 0분 0초에 실행
  @Cron('0 0 0 * * *', {
    name: 'db-backup-batch',
  })
  async run(): Promise<void> {
    const backupPath = `./backup/${new Date().toISOString()}.sql`;

    const dbHost = this.environmentConfigService.getDatabaseHost();
    const dbSchema = this.environmentConfigService.getDatabaseSchema();
    const dbUser = this.environmentConfigService.getDatabaseUser();
    const dbPassword = this.environmentConfigService.getDatabasePassword();
    const removeOldBackupFilesDays =
      this.environmentConfigService.getRemoveOldBackupFilesDays();

    this.backupDatabase(dbHost, dbUser, dbPassword, dbSchema, backupPath);
    this.removeOldBackupFiles(removeOldBackupFilesDays);
  }

  // DB 백업
  private backupDatabase(
    dbHost: string,
    dbuser: string,
    dbpassword: string,
    dbSchema: string,
    backupPath: string,
  ) {
    childProcess.exec(
      backupDatabaseScript(dbHost, dbuser, dbpassword, dbSchema, backupPath),
      (error, stdout, stderr) => {
        if (error) {
          this.logger.error(error.message, error.stack);
          return;
        }
        this.logger.log('batch', `stdout: ${stdout}`);
        this.logger.log('batch', `stderr: ${stderr}`);
      },
    );
  }

  // 1주일 이전 백업 파일 삭제
  private removeOldBackupFiles(days: number) {
    const targetDate = new Date(
      new Date().setDate(new Date().getDate() - days),
    ).toISOString();
    childProcess.exec(
      removeOldBackUpFilesDaysScript(targetDate),
      (error, stdout) => {
        if (error) {
          this.logger.log('batch', error.message);
          return;
        }
        this.logger.log('batch', `stdout: hihi ${stdout}`);
      },
    );
  }

  onApplicationBootstrap() {
    this.run();
  }
}
