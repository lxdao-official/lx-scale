import { NextRequest, NextResponse } from 'next/server';

// Deepseek API u5bc6u94a5 (u5728u751fu4ea7u73afu5883u4e2du5e94u8be5u4f7fu7528u73afu5883u53d8u91cf)
const DEEPSEEK_API_KEY = 'sk-b88a2b246d8d43a8bf704f7e444b4ff3';

export async function POST(request: NextRequest) {
  try {
    // u4eceu8bf7u6c42u4e2du83b7u53d6u6d88u606fu6570u636e
    const requestData = await request.json();
    
    // u8c03u7528 Deepseek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: requestData.model || 'deepseek-chat',
        messages: requestData.messages,
        temperature: requestData.temperature || 0.7,
        max_tokens: requestData.max_tokens || 1000
      })
    });

    // u5982u679c API u8c03u7528u5931u8d25uff0cu8fd4u56deu9519u8bef
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    // u8fd4u56de API u54cdu5e94
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
