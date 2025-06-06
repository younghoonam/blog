import Header from "./components/Header/Header";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";

import { Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import Footer from "./components/Footer/Footer";

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

export const metadata = {
  title: "Younghoo Nam | 남영후",
  description: "웹 디자인 프론트엔드 포트폴리오",
  keywords: "웹 디자인, 프론트엔드, 웹 그래픽, WebGL, Three.js, 포트폴리오",
  authors: [{ name: "Younghoo Nam", url: "https://younghoonam.com" }],
  icons: {
    icon: [
      {
        url: "/icon.svg",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false}>
          <Header lang={lang} />
          <main>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
