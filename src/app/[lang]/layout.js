import Header from "./components/Header/Header";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";

import { Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header lang={lang} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
