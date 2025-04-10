import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, CloudLightning, Factory } from "lucide-react";

export default function IndustrySection() {
	return (
		<section id="industry" className="py-16 bg-muted/30">
			<div className="container">
				<div className="flex flex-col gap-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							The electric companies have the power to increase
							your electricity rates without your consent.
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Weather events, grid repairs, and corporate
							decisions all affect your energy costs. Take back
							control with solar.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardContent className="p-6 flex flex-col gap-4 items-center text-center">
								<ArrowUp className="h-12 w-12 text-red-500" />
								<h3 className="text-xl font-bold">
									Rising Rates
								</h3>
								<p className="text-muted-foreground">
									Utility companies have increased electricity
									rates by an average of 5-8% annually over
									the past decade.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 flex flex-col gap-4 items-center text-center">
								<CloudLightning className="h-12 w-12 text-amber-500" />
								<h3 className="text-xl font-bold">
									Weather Vulnerability
								</h3>
								<p className="text-muted-foreground">
									Extreme weather events lead to outages and
									costly repairs that get passed on to
									consumers through rate hikes.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 flex flex-col gap-4 items-center text-center">
								<Factory className="h-12 w-12 text-slate-500" />
								<h3 className="text-xl font-bold">
									Corporate Control
								</h3>
								<p className="text-muted-foreground">
									Utility monopolies leave consumers with no
									choice but to accept whatever rates they
									set.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="mt-8">
						<Card>
							<CardContent className="p-6 md:p-8">
								<div className="grid gap-6 md:grid-cols-2 md:gap-12">
									<div className="space-y-4">
										<h3 className="text-2xl font-bold">
											The Cost of Inaction
										</h3>
										<p className="text-muted-foreground">
											If electricity rates continue to
											rise at the current pace, the
											average homeowner will pay over
											$30,000 more in the next 20 years
											compared to locking in rates with
											solar today.
										</p>
										<ul className="space-y-2">
											<li className="flex items-start gap-2">
												<span className="text-green-500 font-bold">
													✓
												</span>
												<span>
													Solar provides predictable
													energy costs for 25+ years
												</span>
											</li>
											<li className="flex items-start gap-2">
												<span className="text-green-500 font-bold">
													✓
												</span>
												<span>
													Protection from utility rate
													increases
												</span>
											</li>
											<li className="flex items-start gap-2">
												<span className="text-green-500 font-bold">
													✓
												</span>
												<span>
													Energy independence from
													utility companies
												</span>
											</li>
										</ul>
									</div>
									<div className="relative h-[250px] md:h-auto">
										<Image
											src="/costofinaction.webp"
											alt="Chart showing rising electricity costs vs stable solar costs"
											fill
											className="object-contain"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
