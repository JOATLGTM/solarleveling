import Link from "next/link";
import { Sun } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t bg-muted/40">
			<div className="container py-8 md:py-8">
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
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="text-sm font-medium">Contact</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="tel:+18005551234"
									className="text-muted-foreground hover:underline"
								></Link>
							</li>
							<li>
								<Link
									href="mailto:solarlevelingg@gmail.com"
									className="text-muted-foreground hover:underline"
								>
									solarlevelingg@gmail.com
								</Link>
							</li>
						</ul>
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
