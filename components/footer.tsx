import Link from "next/link";
import { Sun } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t bg-muted/40">
			<div className="container py-8 md:py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<Sun className="h-6 w-6 text-yellow-500" />
							<span className="text-xl font-bold">
								SolarLeveling
							</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Helping homeowners switch to clean, affordable solar
							energy.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-3">
						<div className="space-y-2">
							<h3 className="text-sm font-medium">Company</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										Our Team
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										Careers
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-2">
							<h3 className="text-sm font-medium">Resources</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:underline"
									>
										Solar Calculator
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-2">
							<h3 className="text-sm font-medium">Contact</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="tel:+18005551234"
										className="text-muted-foreground hover:underline"
									>
										(800) 555-1234
									</Link>
								</li>
								<li>
									<Link
										href="mailto:info@solarsolutions.com"
										className="text-muted-foreground hover:underline"
									>
										info@solarsolutions.com
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					<p>
						© {new Date().getFullYear()} SolarSolutions. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
