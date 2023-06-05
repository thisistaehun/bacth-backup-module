export const removeOldBackUpFilesDaysScript = (targetDate: string) => `
  rm ./backup/${targetDate.slice(0, 10)}*.sql
`;
