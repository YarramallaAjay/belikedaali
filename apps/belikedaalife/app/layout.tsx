import './globals.css';
import type { Metadata } from 'next';
import { Caveat } from 'next/font/google';
import { ThemeProvider } from "./components/landingpage/components/theme-provider";

const caveat = Caveat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BelikedaAli - Collaborative Drawing Made Fun',
  description: 'A fun and collaborative drawing tool inspired by Excalidraw',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={caveat.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}