import { NextRequest, NextResponse } from "next/server";

// Deepseek API Key - 优先使用环境变量
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// IP频率限制存储 (生产环境建议使用Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired rate limit records
const cleanupRateLimit = () => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
};

// Check IP rate limit
const checkRateLimit = (ip: string): boolean => {
  cleanupRateLimit();
  
  const now = Date.now();
  const windowMs = 60 * 1000; // 1分钟窗口
  const maxRequests = 10; // Maximum 10 requests per minute
  
  const current = rateLimitMap.get(ip);
  
  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";
    
    // Check IP rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "请求过于频繁，请稍后再试。",
        },
        { status: 429 }
      );
    }

    // Check if API key is available
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "your-api-key-here") {
      return NextResponse.json(
        {
          error: "AI service configuration error",
          message: "AI分析功能暂时不可用，我们正在配置服务。",
        },
        { status: 503 }
      );
    }

    // Get message data from the request
    const requestData = await request.json();
    
    // Validate request data
    if (!requestData.messages || !Array.isArray(requestData.messages)) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "请求数据格式错误。",
        },
        { status: 400 }
      );
    }

    // Limit message count (prevent overly long conversation history)
    const maxMessages = 20;
    if (requestData.messages.length > maxMessages) {
      requestData.messages = requestData.messages.slice(-maxMessages);
    }

    // Call Deepseek API
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: requestData.model || "deepseek-chat",
          messages: requestData.messages,
          temperature: requestData.temperature || 0.7,
          max_tokens: Math.min(requestData.max_tokens || 300, 500), // Limit maximum token count
          stream: requestData.stream || false, // Support streaming requests
        }),
      }
    );

    // Handle different error states
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // Special handling for 402 payment error
      if (response.status === 402) {
        return NextResponse.json(
          {
            error: "Quota exceeded",
            message: "AI分析功能暂时不可用，我们正在升级服务容量。",
            details: errorData,
          },
          { status: 402 }
        );
      }

      // Handle other API errors
      return NextResponse.json(
        {
          error: `API error: ${response.status}`,
          message: "AI服务暂时不可用，请稍后再试。",
          details: errorData,
        },
        { status: response.status }
      );
    }

    // If it's a streaming request, return streaming response directly
    if (requestData.stream) {
      // Return streaming response
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Return API response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "AI服务遇到内部错误，请稍后再试。",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
