import React from 'react';
import { formatRelativeTime } from '../utils/timeUtils';
import { getChannelIcon, getChannelColor } from '../utils/channelUtils';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useLanguage } from '../contexts/LanguageContext';

export const ConversationItem = ({ conversation, isSelected, onClick }) => {
  const { t } = useLanguage();
  const ChannelIcon = getChannelIcon(conversation.channel);

  return (
    <div
      onClick={onClick}
      className={`
        p-4 cursor-pointer transition-all duration-200
        hover:bg-secondary/50
        ${isSelected ? 'bg-secondary border-l-4 border-l-primary' : ''}
      `}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
              {conversation.customer.initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Channel Badge on Avatar */}
          <div 
            className={`
              absolute -bottom-1 -right-1 h-6 w-6 rounded-full 
              flex items-center justify-center shadow-md border-2 border-background
              ${getChannelColor(conversation.channel)}
            `}
          >
            <ChannelIcon className="h-3 w-3 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {conversation.customer.name}
            </h3>
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
              {formatRelativeTime(conversation.lastMessageTime, t)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground truncate mb-2">
            {conversation.lastMessage}
          </p>

          <div className="flex items-center gap-2">
            {/* Channel Badge */}
            <Badge 
              variant="outline" 
              className={`text-xs ${getChannelColor(conversation.channel)} border-0 bg-opacity-10`}
            >
              {t(conversation.channel)}
            </Badge>

            {/* Unread Count */}
            {conversation.unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0 h-5">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;