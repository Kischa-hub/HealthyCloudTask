import pino from 'pino';
import { TestInfo } from '@playwright/test';
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
  
});

export function logTestStart(browserName: string, testInfo: TestInfo) {
  logger.info(`--- 🚀 Starting Test: ${testInfo.title} ---`);
  logger.info(`🧪 Browser: ${browserName}`);
  logger.info(`🌐 Environment: ${process.env.TEST_ENV}`);
  logger.info(`📄 Test File: ${testInfo.file}`);
  logger.info(`📦 Project: ${testInfo.project.name}`);
  logger.info(`🧵 Worker: ${testInfo.workerIndex}`);
}

export function logTestEnd(testInfo: TestInfo){
   logger.info(`--- ✅ Test Completed: ${testInfo.title} finished with status ${testInfo.status} ---`);
}

export function logSuiteEnd(suiteName: string) {
  logger.info(`🎉 🎉 🎉  All tests in "${suiteName}" suite are done.`);
}