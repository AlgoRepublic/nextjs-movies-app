import { NextResponse } from "next/server";

export const successResponse = (message, data = {}, status = 200) => {
  const response = { success: true, message, data: { ...data } };

  return NextResponse.json(response, { status });
};

export const errorResponse = (message, errors = {}, status = 400) => {
  const response = { success: false, message, errors };

  return NextResponse.json(response, { status });
};
