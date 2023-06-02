import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as childProcess from 'child_process';
import { EnvironmentConfigService } from 'src/environment-config/environment-config.service';

@Injectable()
export class BatchService implements OnApplicationBootstrap {
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}
  @Cron('0 0 0 * * *', {
    name: 'db-backup-batch',
  })
  async run(): Promise<void> {
    const backupPath = `./backup/${new Date().toISOString()}.sql`;
    const dbSchema = this.environmentConfigService.getDatabaseSchema();
    const dbuser = this.environmentConfigService.getDatabaseUser();
    const dbpassword = this.environmentConfigService.getDatabasePassword();

    this.backupDatabase(dbuser, dbpassword, dbSchema, backupPath);
    this.removeOldBackupFiles(7);
  }

  private backupDatabase(
    dbuser: string,
    dbpassword: string,
    dbSchema: string,
    backupPath: string,
  ) {
    childProcess.exec(
      `docker exec -i mtd-db mysqldump -u ${dbuser} -p${dbpassword} ${dbSchema} > ${backupPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      },
    );
  }

  private removeOldBackupFiles(days = 7) {
    // 1주일 이전 백업 파일 삭제
    childProcess.exec(
      `find ./backup -mtime +${days} -type f -delete`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      },
    );
  }

  onApplicationBootstrap() {
    this.run();
  }
}
