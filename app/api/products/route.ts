import { NextResponse } from "next/server";
import axios from "axios";

const EXTERNAL_API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;
const EXTERNAL_API_ENDPOINT = "/api/web/v1/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";
    const search = searchParams.get("search") || "";

    const apiQuery = new URLSearchParams({ page, limit });
    if (search) apiQuery.set("search", search);
    const queryString = apiQuery.toString();

    // 1. Ambil Authorization token yang dikirim dari utils/axios.ts
    const authorizationHeader = request.headers.get("Authorization");

    // 2. Siapkan token Headers untuk panggilan ke API
    const headers = authorizationHeader
      ? { Authorization: authorizationHeader }
      : {};

    const externalResponse = await axios.get(
      `${EXTERNAL_API_BASE_URL}${EXTERNAL_API_ENDPOINT}?${queryString}`,
      { headers }
    );

    // Teruskan response data dan status code sukses ke frontend
    return NextResponse.json(externalResponse.data);
  } catch (error: any) {
    //error message
    const status = error.response?.status || 500;

    const externalErrorMessage =
      error.response?.data?.message || error.response?.data?.error;
    const message =
      externalErrorMessage || "Failed to fetch products from external API.";

    console.error("Error in /api/products proxy:", status, message);

    return NextResponse.json({ error: message }, { status });
  }
}
