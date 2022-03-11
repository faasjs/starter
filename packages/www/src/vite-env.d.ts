/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
