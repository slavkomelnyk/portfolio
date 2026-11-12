import type { routing } from "@/i18n/routing";
import type messages from "@/messages/en.json";

// Typed locales and message keys: a missing translation key is a TypeScript error.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
