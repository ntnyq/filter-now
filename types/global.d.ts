/**
 * @file Global types
 */

declare global {
  interface Window {}
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
