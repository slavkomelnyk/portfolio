import { prefix } from "@/config/main";
import { LOCALE_STORAGE_KEY, routing } from "@/i18n/routing";

/**
 * Static export has no middleware, so `/` picks the language in the browser:
 * saved choice -> browser language -> default. The meta refresh covers disabled JS.
 */
const script = `try{var l=${JSON.stringify(routing.locales)},s=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)}),n=(navigator.language||"").slice(0,2),c=l.indexOf(s)>-1?s:l.indexOf(n)>-1?n:${JSON.stringify(routing.defaultLocale)};location.replace(${JSON.stringify(prefix)}+"/"+c+"/"+location.hash)}catch(e){location.replace(${JSON.stringify(`${prefix}/${routing.defaultLocale}/`)})}`;

export default function RootRedirect() {
  const fallback = `${prefix}/${routing.defaultLocale}/`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${fallback}`} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <a href={fallback}>{fallback}</a>
    </>
  );
}
