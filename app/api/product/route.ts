import { NextResponse } from "next/server";
import axios from "axios";

// Ganti dengan URL External API Anda yang sebenarnya
const EXTERNAL_API_BASE_URL = "http://localhost:8001";
const EXTERNAL_PRODUCT_ENDPOINT = `${EXTERNAL_API_BASE_URL}/api/web/v1/product`;

// GET /api/product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.toString();
    const externalResponse = await axios.get(
      `${EXTERNAL_PRODUCT_ENDPOINT}?${search}`
    );
    return NextResponse.json(externalResponse.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    return NextResponse.json(
      { error: "Failed to fetch single product." },
      { status }
    );
  }
}

// POST /api/product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Get authorization header from request
    const authHeader = request.headers.get("authorization");
    const headers: any = {};
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    const externalResponse = await axios.post(EXTERNAL_PRODUCT_ENDPOINT, body, {
      headers,
    });
    return NextResponse.json(externalResponse.data, {
      status: externalResponse.status,
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    return NextResponse.json(
      { error: "Failed to create product." },
      { status }
    );
  }
}

// PUT /api/product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Get authorization header from request
    const authHeader = request.headers.get("authorization");
    const headers: any = {};
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    const externalResponse = await axios.put(EXTERNAL_PRODUCT_ENDPOINT, body, {
      headers,
    });
    return NextResponse.json(externalResponse.data, {
      status: externalResponse.status,
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    return NextResponse.json(
      { error: "Failed to update product." },
      { status }
    );
  }
}
