export const backupDatabaseScript = (
  dbHost: string,
  dbUser: string,
  dbPassword: string,
  dbSchema: string,
  backupPath: string,
) =>
  `docker exec -i ${dbHost} mysqldump -u ${dbUser} -p${dbPassword} ${dbSchema} > ${backupPath}`;
