/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly EMAILJS_SERVICE_ID: string
    readonly EMAILJS_TEMPLATE_ID: string
    readonly EMAILJS_PUBLIC_KEY: string
    readonly GEMINI_API_KEY: string
  }
}

