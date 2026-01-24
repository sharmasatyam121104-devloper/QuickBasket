import { NextResponse } from "next/server";

interface ErrorResponse {
  success: false;
  message: string;
}

/**
 * Reusable server-side catch error handler
 * -------------------------------------------------
 * - Accepts any thrown error (system or custom)
 * - No source field included
 * - Optional override message and status
 */
const serverErrorHandler = (
  error: unknown,
  options?: {
    message?: string; // optional custom message
    status?: number;  // optional HTTP status code, default 500
  }
): NextResponse => {
  const { message, status = 500 } = options || {};

  const response: ErrorResponse = {
    success: false,
    message:
      message ?? (error instanceof Error ? error.message : "Internal Server Error"),
  };

  return NextResponse.json(response, { status });
};

export default serverErrorHandler;
