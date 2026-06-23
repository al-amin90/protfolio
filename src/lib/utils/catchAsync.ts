/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import AppError from "../errors/AppError";
import { Handler } from "../types";

const catchAsync = (fn: Handler): Handler => {
  return async (req: NextRequest, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error) {
      return handleError(error);
    }
  };
};

export function handleError(err: any): NextResponse {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  }

  return NextResponse.json(
    {
      success: false,
      message,
      errorSources,
      stack: process.env.NODE_ENV === "development" ? err?.stack : null,
    },
    { status: statusCode },
  );
}

export default catchAsync;
