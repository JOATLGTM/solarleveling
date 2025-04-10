import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image
					src="/solarpanels.webp"
					alt="Solar panels on a home roof"
					fill
					className="object-cover opacity-10"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-background to-background/60" />
			</div>
			<div className="container relative z-10">
				<div className="grid md:grid-cols-2">
					<div className="flex flex-col justify-center space-y-4 py-20 md:py-32 pr-8">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
							No upfront cost! Stop paying endless bills. Switch
							to solar and own your energy.
						</h1>
						<p className="max-w-[600px] text-muted-foreground md:text-xl">
							Take control of your energy costs with clean,
							renewable solar power. Save money from day one and
							protect yourself from rising utility rates.
						</p>
						<div className="flex flex-col gap-2 sm:flex-row">
							<Button size="lg" asChild>
								<Link href="#contact">
									Get a Free Consultation
								</Link>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<Link href="#qualify">Check Eligibility</Link>
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9]"></div>
					</div>
				</div>
			</div>
		</section>
	);
}
