import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/common/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeExplorer - Discover & Explore Recipes",
  description: "Explore a world of delicious recipes with RecipeExplorer. Find, save, and share your favorite meals effortlessly!",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in the public folder
  },
  openGraph: {
    title: "RecipeExplorer - Discover & Explore Recipes",
    description: "Explore a world of delicious recipes with RecipeExplorer. Find, save, and share your favorite meals effortlessly!",
    type: "website",
    url: "assignment-recipe-pied.vercel.app",
    images: [
      {
        url: "/images/logo.jpg", // Ensure this file exists in the public/images/ folder
        width: 1200,
        height: 630,
        alt: "RecipeExplorer Logo",
      },
    ],
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-16 md:pt-20 bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
