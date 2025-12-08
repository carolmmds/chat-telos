import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { formatMessageTime } from '../utils/timeUtils';

export const MessageBubble = ({ message }) => {
  const isAgent = message.sender === 'agent';

  const getStatusIcon = () => {
    if (message.sender === 'customer') return null;
    
    switch (message.status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
      case 'read':
        return <CheckCheck className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-start gap-2 animate-fade-in ${
      isAgent ? 'justify-end' : 'justify-start'
    }`}>
      {/* Message Bubble */}
      <div className={`
        max-w-[70%] px-4 py-3 rounded-2xl shadow-sm
        ${
          isAgent 
            ? 'bg-primary text-primary-foreground rounded-br-md' 
            : 'bg-card text-card-foreground border border-border rounded-bl-md'
        }
        transition-all hover:shadow-md
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, index) => (
              <div 
                key={index}
                className={`
                  text-xs px-2 py-1 rounded inline-block
                  ${
                    isAgent 
                      ? 'bg-primary-foreground/20' 
                      : 'bg-muted'
                  }
                `}
              >
                📄 {attachment.name}
              </div>
            ))}
          </div>
        )}
        
        <div className={`
          flex items-center gap-1 mt-1 text-xs
          ${
            isAgent 
              ? 'text-primary-foreground/70' 
              : 'text-muted-foreground'
          }
        `}>
          <span>{formatMessageTime(message.timestamp)}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;