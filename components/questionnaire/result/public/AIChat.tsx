'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { Separator } from '@/components/ui/separator';
import useGetLang from '@/hooks/useGetLang';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  questionnaireResults: Record<string, unknown>;
  questionnaireType: string;
}

export function AIChat({ questionnaireResults, questionnaireType }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [initialSuggestion, setInitialSuggestion] = useState<string>('');
  const [isLoadingInitialSuggestion, setIsLoadingInitialSuggestion] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const t = useScopedI18n('component.questionnaire.result.public.aiChat');
  const lang = useGetLang();

  //Use our API route instead of calling Deepseek API directly
  const API_ENDPOINT = '/api/chat';

  // Generate initial AI suggestion
  const generateInitialSuggestion = useCallback(async () => {
    setIsLoadingInitialSuggestion(true);
    try {
      // Prepare messages to send to API
      const initialPrompt = {
        role: 'system',
        content: `作为心理健康助手，基于${questionnaireType}测评结果${JSON.stringify(questionnaireResults)}，请用${lang === 'zh' ? '中文' : 'English'}提供简短建议和日常缓解方法。友善支持，非医疗诊断，200字内。`
      };

      // Call our API route
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [initialPrompt],
          temperature: 0.7,
          max_tokens: 300 // 减少token使用
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const suggestion = data.choices[0].message.content;
      setInitialSuggestion(suggestion);
    } catch (error) {
      console.error('Error generating initial suggestion:', error);
      // 检查是否是402付费错误
      if (error instanceof Error && error.message.includes('402')) {
        setInitialSuggestion('🔔 AI分析功能暂时不可用，请稍后再试。我们正在升级服务以提供更好的体验！');
      } else {
        setInitialSuggestion(t('initialSuggestionError') || '⚠️ 无法生成AI建议，请稍后再试。');
      }
    } finally {
      setIsLoadingInitialSuggestion(false);
    }
  }, [questionnaireType, questionnaireResults, lang, t]);

  // 移除自动生成，改为手动触发
  // useEffect(() => {
  //   generateInitialSuggestion();
  // }, [generateInitialSuggestion]);

  // Scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 检查消息长度限制
    if (input.length > 500) {
      alert('消息长度不能超过500字符');
      return;
    }

    // 检查对话次数限制
    if (messageCount >= 10) {
      alert('本次会话已达到10次对话限制。刷新页面可重新开始对话。');
      return;
    }

    // 检查发送频率限制
    const now = Date.now();
    if (now - lastMessageTime < 3000) {
      alert('发送过于频繁，请稍等3秒后再试');
      return;
    }

    setLastMessageTime(now);
    setMessageCount(prev => prev + 1);

     // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare message history to send to API
      const messageHistory = [
        {
          role: 'system',
          content: `心理健康助手，基于${questionnaireType}结果${JSON.stringify(questionnaireResults)}回答。用${lang === 'zh' ? '中文' : 'English'}，友善支持，非医疗诊断，简洁回复。`
        },
        ...messages,
        userMessage
      ];

      // Call our API route
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messageHistory,
          temperature: 0.7,
          max_tokens: 400 // 减少token使用
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Add AI response
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      // 检查错误类型，提供更具体的错误消息
      let errorMessage = t('apiErrorMessage') || '⚠️ AI服务暂时不可用，请稍后再试。';
      
      if (error instanceof Error && error.message.includes('402')) {
        errorMessage = '🔔 AI分析功能暂时不可用，我们正在升级服务容量。感谢您的理解！';
      }
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key events (press Enter to send message)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render message content (supports Markdown)
  const renderMessageContent = (content: string) => {
    // Simple Markdown rendering
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n\n/g, '<br /><br />') // Paragraph
      .replace(/\n/g, '<br />'); // Line break

    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="mt-6">
      {/* AI分析区域 */}
      <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
        {initialSuggestion ? (
          <div className="text-blue-800">
            {renderMessageContent(initialSuggestion)}
          </div>
        ) : (
          <div className="text-center py-4">
            {isLoadingInitialSuggestion ? (
              <div className="flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-blue-700 mb-3">🤖 想获得AI的专业分析和建议吗？</p>
                <Button 
                  onClick={generateInitialSuggestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  disabled={isLoadingInitialSuggestion}
                >
                  获取AI分析建议
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 聊天按钮或聊天界面 */}
      {!showChat ? (
        <Button 
          onClick={() => setShowChat(true)} 
          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md"
          variant="ghost"
        >
          {t('startChatButton')}
        </Button>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="bg-blue-50 p-3 border-b flex justify-between items-center">
            <h3 className="font-medium text-blue-800">{t('chatTitle')}</h3>
            <span className="text-sm text-blue-600">
              剩余对话次数: {10 - messageCount}/10
            </span>
          </div>
          
          {/* 消息区域 */}
          <div 
            ref={chatContainerRef}
            className="h-80 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                {t('chatPlaceholder')}
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-gray-100 text-gray-800'}`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* 输入区域 */}
          <div className="p-3">
            <div className="flex mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={messageCount >= 10 ? '已达到对话限制' : t('inputPlaceholder')}
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isLoading || messageCount >= 10}
                maxLength={500}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim() || messageCount >= 10}
                className="rounded-l-none"
              >
                {t('sendButton')}
              </Button>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{input.length}/500 字符</span>
              {messageCount >= 10 && (
                <span className="text-orange-600">
                  已达到对话限制，刷新页面可重新开始
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
