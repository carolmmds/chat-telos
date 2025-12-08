import React, { useState, useRef, useEffect } from 'react';
import { Info, Paperclip, Send, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { getChannelIcon, getChannelBadgeColor } from '../utils/channelUtils';
import { formatMessageTime } from '../utils/timeUtils';
import { useLanguage } from '../contexts/LanguageContext';
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import FileAttachment from './FileAttachment';
import { toast } from 'sonner';

export const ChatArea = ({ conversation, onSendMessage, onToggleInfoPanel, templates }) => {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (!conversation) return;
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage?.sender === 'agent') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [conversation?.messages]);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;

    onSendMessage(message, attachments);
    setMessage('');
    setAttachments([]);
    setShowQuickReplies(false);
    textareaRef.current?.focus();
    
    toast.success(language === 'pt' ? 'Mensagem enviada!' : 'Message sent!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTemplateSelect = (template) => {
    const text = language === 'pt' ? template.text : template.textEn;
    setMessage(text);
    setShowQuickReplies(false);
    textareaRef.current?.focus();
  };

  const handleFileSelect = (files) => {
    setAttachments([...attachments, ...files]);
    setShowFileDialog(false);
    toast.success(
      language === 'pt' 
        ? `${files.length} arquivo(s) anexado(s)` 
        : `${files.length} file(s) attached`
    );
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-4">
            <Info className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">{t('selectConversation')}</p>
        </div>
      </div>
    );
  }

  const ChannelIcon = getChannelIcon(conversation.channel);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
              {conversation.customer.initials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-semibold text-foreground">{conversation.customer.name}</h2>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getChannelBadgeColor(conversation.channel)}`}
              >
                <ChannelIcon className="h-3 w-3 mr-1" />
                {t(conversation.channel)}
              </Badge>
              {isTyping && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="animate-pulse">{t('typing')}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInfoPanel}
          className="hover:bg-secondary transition-colors"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-background to-secondary/20">
        {conversation.messages.map((msg, index) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2 animate-fade-in">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs">
                {conversation.customer.initials}
              </AvatarFallback>
            </Avatar>
            <div className="bg-card px-4 py-3 rounded-2xl shadow-sm border border-border">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Panel */}
      {showQuickReplies && (
        <QuickReplies 
          templates={templates}
          onSelect={handleTemplateSelect}
          onClose={() => setShowQuickReplies(false)}
        />
      )}

      {/* File Attachment Dialog */}
      {showFileDialog && (
        <FileAttachment
          onSelect={handleFileSelect}
          onClose={() => setShowFileDialog(false)}
        />
      )}

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-6 py-2 border-t border-border bg-card">
          <div className="flex gap-2 flex-wrap">
            {attachments.map((file, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="pl-2 pr-1 py-1 gap-2"
              >
                {file.name}
                <button
                  onClick={() => removeAttachment(index)}
                  className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          {/* Quick Replies Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className="flex-shrink-0 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            title={t('quickReplies')}
          >
            <Zap className="h-4 w-4" />
          </Button>

          {/* Attachment Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFileDialog(true)}
            className="flex-shrink-0 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            title={t('attach')}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Message Input */}
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t('typeMessage')}
            className="resize-none min-h-[44px] max-h-32 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-all"
            rows={1}
          />

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;