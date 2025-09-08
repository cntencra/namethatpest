import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { QuizProvider } from "../contexts/TestType";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <QuizProvider>
        <Header/>
        <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-5">
          {children}
        </main>
        <Footer/>
      </QuizProvider>
      </body>
    </html>
  );
}
