import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

import { MiddlewareFactory } from "./types";

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    if (res) {
      res.headers.set("x-dns-prefetch-control", "on");
      res.headers.set(
        "Strict-Transport-Security",
        "max-age=3571000; includeSubDomains; preload"
      );
      res.headers.set("X-XSS-Protection", "1; mode=block");
      res.headers.set("x-frame-options", "SAMEORIGIN");
      res.headers.set("x-content-type-options", "nosniff");
      res.headers.set("x-download-options", "noopen");
      res.headers.set("Referrer-Policy", "origin-when-cross-origin");
    }

    return res;
  };
};
