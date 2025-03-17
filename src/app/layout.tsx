import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
    variable: "--font-share-tech-mono",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Jean Michel - Portfolio",
    description: "Portfolio de Jean Michel ANDRIANANTENAINA - Développeur Web Full Stack",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">
        <body
            className={`${orbitron.variable} ${shareTechMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}