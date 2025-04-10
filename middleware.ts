import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// Get the pathname of the request
	const path = request.nextUrl.pathname;

	// Check if the path starts with /admin
	if (path.startsWith("/admin")) {
		// Get the authentication status from cookies
		const isAuthenticated =
			request.cookies.get("isAuthenticated")?.value === "true";
		const authTimestamp = request.cookies.get("authTimestamp")?.value;

		// Check if the authentication is valid (within 24 hours)
		const isValidAuth =
			isAuthenticated &&
			authTimestamp &&
			Date.now() - new Date(authTimestamp).getTime() <
				24 * 60 * 60 * 1000;

		// If not authenticated, redirect to login page
		if (!isValidAuth) {
			// Don't redirect if already on the login page
			if (path === "/login") {
				return NextResponse.next();
			}

			// Redirect to login page
			const url = request.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	}

	// Continue with the request
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/admin/:path*", "/login"],
};
