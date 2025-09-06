import { Mona_Sans } from "next/font/google";
import "./globals.css";
import Provider  from "./provider";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai-interviewer",
  description: "An AI-powered platform for interview preparation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={`${monaSans.className} antialiased`}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
