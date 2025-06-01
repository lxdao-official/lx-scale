import { NextRequest, NextResponse } from 'next/server';

// Deepseek API Key (should use environment variables in production environment)
const DEEPSEEK_API_KEY = 'sk-b88a2b246d8d43a8bf704f7e444b4ff3';

export async function POST(request: NextRequest) {
  try {
    // Get message data from the request
    const requestData = await request.json();
    
    // Call Deepseek API
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

    // If API call fails, return error
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    // Return API response
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
