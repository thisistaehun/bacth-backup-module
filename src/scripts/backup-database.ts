export const backupDatabaseScript = (
  dbHost: string,
  dbUser: string,
  dbPassword: string,
  dbSchema: string,
  backupPath: string,
) =>
  `mysqldump -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbSchema} > ${backupPath}`;

//docker exec -i ${dbHost} mysqldump -u ${dbuser} -p${dbpassword} ${dbSchema} > ${backupPath}`;
