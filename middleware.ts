import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;

  const protectedEndpoints = [
    { path: "/api/issues", methods: ["POST"] },
    { path: "/api/issues/", methods: ["PATCH", "DELETE"] },
  ];

  const isProtectedApi = protectedEndpoints.some(
    (endpoint) =>
      pathname.startsWith(endpoint.path) && endpoint.methods.includes(method)
  );

  const session = await auth();

  if (!session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      const signInUrl = new URL("/api/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
    "/api/issues",
    "/api/issues/:id+",
  ],
};
