import { NextRequest, NextResponse } from "next/server";

// Deepseek API Key - 优先使用环境变量
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥是否可用
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
          max_tokens: requestData.max_tokens || 1000,
        }),
      }
    );

    // 处理不同的错误状态
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // 特殊处理402付费错误
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

      // 处理其他API错误
      return NextResponse.json(
        {
          error: `API error: ${response.status}`,
          message: "AI服务暂时不可用，请稍后再试。",
          details: errorData,
        },
        { status: response.status }
      );
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
