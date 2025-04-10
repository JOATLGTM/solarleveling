import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Menu } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Sun className="h-6 w-6 text-yellow-500" />
					<Link href="/" className="text-xl font-bold">
						SolarLeveling
					</Link>
				</div>
				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="#benefits"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Benefits
					</Link>
					<Link
						href="#industry"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Industry Insights
					</Link>
					<Link
						href="#ppa"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						PPA
					</Link>
					<Link
						href="#qualify"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Qualify
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<Button asChild className="hidden md:flex">
						<Link href="#contact">Contact Us</Link>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="md:hidden">
							<Button variant="ghost" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[200px]">
							<DropdownMenuItem asChild>
								<Link
									href="#benefits"
									className="text-sm font-medium hover:underline underline-offset-4"
								>
									Benefits
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									href="#industry"
									className="text-sm font-medium hover:underline underline-offset-4"
								>
									Industry Insights
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									href="#ppa"
									className="text-sm font-medium hover:underline underline-offset-4"
								>
									PPA
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									href="#qualify"
									className="text-sm font-medium hover:underline underline-offset-4"
								>
									Qualify
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Button asChild className="w-full">
									<Link href="#contact">Contact Us</Link>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
