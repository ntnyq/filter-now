/**
 * @file Global types
 */

declare global {
  interface Window {}
}

interface ImportMeta {
  env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}
