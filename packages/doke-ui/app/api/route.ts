import { POSTRequestDefault } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

interface NextCustomRequest extends NextRequest {
  json: () => Promise<POSTRequestDefault>;
}

export async function POST(req: NextCustomRequest) {
  const { serverUrl, method, headers, query, params, body } = await req.json();

  try {
    const response = await fetch(serverUrl + params + query, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        error: "fetch failed",
        message: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
