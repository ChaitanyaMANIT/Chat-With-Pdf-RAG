'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';

interface Doc {
  pageContent?: string;
  metdata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}
interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const handleSendChatMessage = async () => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    const res = await fetch(`http://localhost:8000/chat?message=${message}`);
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: data?.message,
        documents: data?.docs,
      },
    ]);
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 pb-24">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p className="text-lg">Start a conversation by asking a question about your PDF</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-100 border border-slate-700'
                  }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                {message.documents && message.documents.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-600">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      Source Documents:
                    </p>
                    {message.documents.map((doc, i) => (
                      <div key={i} className="text-xs text-slate-400 mb-2">
                        <p className="text-slate-300">
                          {doc.pageContent?.substring(0, 200)}...
                        </p>
                        {doc.metdata?.source && (
                          <p className="mt-1 text-slate-500">
                            Source: {doc.metdata.source}
                            {doc.metdata.loc?.pageNumber
                              ? ` (Page ${doc.metdata.loc.pageNumber})`
                              : ''}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-4 left-[30vw] right-0 px-4 flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.trim()) {
              handleSendChatMessage();
            }
          }}
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};
export default ChatComponent;