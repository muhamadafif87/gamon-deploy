import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makaroni Gamon | Bikin Meweq, Antri Redfleq",
  description: "Makaroni Gamon - Bikin Nangis, Anti Redflag. Nikmati cemilan makaroni pedas dengan berbagai varian rasa yang nagih dan renyah.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
