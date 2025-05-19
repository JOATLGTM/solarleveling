import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Solar Leveling | Zero-Cost Solar Energy Solutions",
	description:
		"Transform your energy future with zero upfront costs. Get solar panels installed, reduce bills, and own your power with our innovative PPA solutions.",
	keywords:
		"solar energy, solar panels, renewable energy, PPA, power purchase agreement, home solar, zero cost solar, solar installation",
	generator: "Next.js",
	robots: "index, follow",
	viewport: "width=device-width, initial-scale=1",
	openGraph: {
		title: "Solar Leveling | Zero-Cost Solar Energy Solutions",
		description:
			"Transform your energy future with zero upfront costs. Get solar panels installed, reduce bills, and own your power with our innovative PPA solutions.",
		type: "website",
		locale: "en_US",
		siteName: "Solar Leveling",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

import "./globals.css";
