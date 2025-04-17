"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const textRef = useRef(null);
	const buttonGroupRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { duration: 1.5, ease: "power2.out" },
			});

			tl.from(titleRef.current, { opacity: 0, y: 40 })
				.from(textRef.current, { opacity: 0, y: 30 }, "-=0.6")
				.from(buttonGroupRef.current, { opacity: 0, y: 20 }, "-=0.6");

			// Optional: Scroll-triggered effects
			gsap.utils.toArray("h1, h2, h3, p").forEach((el) => {
				gsap.from(el as HTMLElement, {
					scrollTrigger: {
						trigger: el as HTMLElement,
						start: "top 90%",
						toggleActions: "play none none none",
					},
					opacity: 0,
					y: 20,
					duration: 0.2,
					ease: "power2.out",
				});
			});
		}, sectionRef);

		return () => ctx.revert(); // Clean up
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden min-h-screen"
		>
			<div className="absolute inset-0 z-0">
				<Image
					src="/solarpanels.webp"
					alt="Solar panels on a home roof"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-background to-background/60" />
			</div>
			<div className="container relative z-10 flex items-center justify-center min-h-screen py-8 md:py-0">
				<div className="grid md:grid-cols-2 w-full">
					<div className="flex flex-col justify-center space-y-4 py-12 md:py-32 px-4 md:pr-8 text-center md:text-left">
						<h1
							ref={titleRef}
							className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
						>
							No upfront cost! Stop paying endless bills. Switch
							to solar and own your energy.
						</h1>
						<p
							ref={textRef}
							className="max-w-[600px] text-muted-foreground md:text-xl mx-auto md:mx-0"
						>
							Take control of your energy costs with clean,
							renewable solar power. Save money from day one and
							protect yourself from rising utility rates.
						</p>
						<div
							ref={buttonGroupRef}
							className="flex flex-col gap-2 sm:flex-row justify-center md:justify-start"
						>
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
				</div>
			</div>
		</section>
	);
}
