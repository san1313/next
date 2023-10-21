declare namespace NodeJS {
  export interface ProcessEnv {
    KEY_PATH: string;
    DB_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    JWT_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
