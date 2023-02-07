import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const res = NextResponse.next();

    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/api/ai") || pathname.startsWith("/protected")) {
      const supabase = createMiddlewareSupabaseClient({ req, res });
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        return res;
      }

      return NextResponse.redirect(new URL("/", req.url));
    }
    return next(req, _next);
  };
};

export const config = {
  matcher: ["/protected/:path*", "/api/ai/:path*"],
};
