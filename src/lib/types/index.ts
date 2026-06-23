/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

export type Handler = (
  req: NextRequest,
  context?: { params: Promise<any> },
) => Promise<NextResponse>;

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}
