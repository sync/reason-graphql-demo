declare namespace NodeJS {
  interface Process {
    browser: any;
  }
  interface Global {
    page: any;
    fetch: any;
  }
}

declare module '*.css';
