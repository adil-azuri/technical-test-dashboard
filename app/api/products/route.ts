import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:8001";
const API_ENDPOINT = "/api/web/v1/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.toString();

    // 1. Ambil Authorization token yang dikirim dari utils/axios.ts
    const authorizationHeader = request.headers.get("Authorization");

    // 2. Siapkan token Headers untuk panggilan ke API
    const headers = authorizationHeader
      ? { Authorization: authorizationHeader }
      : {};

    const externalResponse = await axios.get(
      `${API_BASE_URL}${API_ENDPOINT}?${search}`,
      { headers }
    );

    // Teruskan response data dan status code sukses ke frontend
    return NextResponse.json(externalResponse.data);
  } catch (error: any) {
    const status = error.response?.status || 500;

    const externalErrorMessage =
      error.response?.data?.message || error.response?.data?.error;
    const message =
      externalErrorMessage || "Failed to fetch products from external API.";

    console.error("Error in /api/products proxy:", status, message);

    return NextResponse.json({ error: message }, { status });
  }
}
