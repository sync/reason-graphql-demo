declare namespace NodeJS {
  interface Process {
    browser: any;
  }
  interface Global {
    page: any;
  }
}

declare module '*.css';
