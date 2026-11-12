import "../globals.css";

// Second root layout: only serves `/`, which forwards to the visitor's language.
export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
