import * as fs from 'fs';
import * as path from 'path';

export class TestDataLoader {
  private static validateData(data: unknown): void {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid test data: Data must be a non-null object.');
    }
  }

  public static loadTestData<T>(fileName: string): T {
    const filePath = path.resolve(__dirname, 'testdata', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    this.validateData(parsedData);

    return parsedData as T;
  }
}

// Usage example:
// interface UserData {
//   username: string;
//   password: string;
// }

// const userData = TestDataLoader.loadTestData<UserData>('user.json');
// console.log(userData.username, userData.password);

// Note: Ensure that the 'testdata' directory exists and contains the relevant JSON files.

//************************************ */
//project example of how to use this utility
//import { TestDataLoader } from '../../utils/testDataLoader';
//if i want to use external json file and centralized test data access
    //const users = TestDataLoader.loadTestData<{ validUser: { username: string; password: string } }>('users.json');
    //await page.getByLabel('Benutzername').fill(users.validUser.username);
    //await page.getByLabel('Passwort').fill(users.validUser.password);