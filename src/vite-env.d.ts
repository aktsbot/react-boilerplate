/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BUILD_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
