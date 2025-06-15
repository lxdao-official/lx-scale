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
  const [isLoadingInitialSuggestion, setIsLoadingInitialSuggestion] = useState(true);
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
        content: `你是一个心理健康助手，需要根据用户完成的心理测评问卷提供简短的建议和支持。
        问卷ID: ${questionnaireType}
        问卷结果: ${JSON.stringify(questionnaireResults)}
        请提供一段简短的建议，帮助用户理解测评结果并给出一些实用的日常缓解方法。使用${lang === 'zh' ? '中文' : 'English'}回复。
        回复应该友善、支持性且有帮助，但不要做出医疗诊断。可以使用一些emoji，350字左右。`
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
          max_tokens: 500
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
      setInitialSuggestion(t('initialSuggestionError'));
    } finally {
      setIsLoadingInitialSuggestion(false);
    }
  }, [questionnaireType, questionnaireResults, lang, t]);

  // Generate initial suggestion when component loads
  useEffect(() => {
    generateInitialSuggestion();
  }, [generateInitialSuggestion]);

  // Scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

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
          content: `你是一个心理健康助手，基于用户完成的心理测评问卷提供建议和支持。
          问卷类型: ${questionnaireType}
          问卷结果: ${JSON.stringify(questionnaireResults)}
          请根据用户的问题和问卷结果提供有帮助的回应。使用${lang === 'zh' ? '中文' : 'English'}回复。
          你的回复应该友善、支持性且有帮助，但不要做出医疗诊断。可以使用一些emoji，350字左右`
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
          max_tokens: 1000
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
      // Add error message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('apiErrorMessage') }
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
      {/* 初始AI建议 */}
      <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
        {isLoadingInitialSuggestion ? (
          <div className="flex items-center justify-center py-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : (
          <div className="text-blue-800">
            {renderMessageContent(initialSuggestion)}
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
          <div className="bg-blue-50 p-3 border-b">
            <h3 className="font-medium text-blue-800">{t('chatTitle')}</h3>
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
          <div className="p-3 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('inputPlaceholder')}
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !input.trim()}
              className="rounded-l-none"
            >
              {t('sendButton')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
