import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MessageSquare, Save } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { getChannelIcon, getChannelBadgeColor } from '../utils/channelUtils';
import { formatFullDate } from '../utils/timeUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export const InfoPanel = ({ conversation, notes, onStatusChange, onAddNote }) => {
  const { t, language } = useLanguage();
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(conversation.status);

  const ChannelIcon = getChannelIcon(conversation.channel);

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    
    onAddNote(newNote);
    setNewNote('');
    toast.success(language === 'pt' ? 'Nota adicionada!' : 'Note added!');
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
    toast.success(
      language === 'pt' 
        ? `Status alterado para ${t(newStatus)}` 
        : `Status changed to ${t(newStatus)}`
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-green-500/10 text-green-600 border-green-500/20',
      resolved: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-600';
  };

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full overflow-hidden animate-slide-in-right">
      {/* Customer Profile */}
      <div className="p-6 border-b border-border bg-gradient-to-b from-card to-background">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3 border-4 border-background shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-2xl font-bold">
              {conversation.customer.initials}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg text-foreground mb-1">
            {conversation.customer.name}
          </h2>
          <Badge 
            variant="outline" 
            className={`text-xs mb-2 ${getChannelBadgeColor(conversation.channel)}`}
          >
            <ChannelIcon className="h-3 w-3 mr-1" />
            {t(conversation.channel)}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{conversation.customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{conversation.customer.phone}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Conversation Details */}
        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {t('conversationDetails')}
          </h3>
          
          <div className="space-y-3">
            {/* Channel */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t('channel')}
              </label>
              <Badge 
                variant="outline" 
                className={`${getChannelBadgeColor(conversation.channel)}`}
              >
                <ChannelIcon className="h-3 w-3 mr-1" />
                {t(conversation.channel)}
              </Badge>
            </div>

            {/* Start Time */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t('startTime')}
              </label>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatFullDate(conversation.startTime)}</span>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {t('status')}
              </label>
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <Badge className={getStatusColor(selectedStatus)}>
                      {t(selectedStatus)}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">
                    <Badge className={getStatusColor('open')}>
                      {t('open')}
                    </Badge>
                  </SelectItem>
                  <SelectItem value="pending">
                    <Badge className={getStatusColor('pending')}>
                      {t('pending')}
                    </Badge>
                  </SelectItem>
                  <SelectItem value="resolved">
                    <Badge className={getStatusColor('resolved')}>
                      {t('resolved')}
                    </Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Internal Notes */}
        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground mb-3">
            {t('internalNotes')}
          </h3>

          {/* Existing Notes */}
          <div className="space-y-2 mb-4">
            {notes.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                {language === 'pt' ? 'Nenhuma nota ainda' : 'No notes yet'}
              </p>
            ) : (
              notes.map((note) => (
                <Card key={note.id} className="p-3 bg-secondary/50">
                  <p className="text-sm text-foreground mb-2">{note.text}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{note.author}</span>
                    <span>{formatFullDate(note.timestamp)}</span>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Add New Note */}
          <div className="space-y-2">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={t('addNote')}
              className="resize-none min-h-[80px] text-sm bg-background"
            />
            <Button
              onClick={handleSaveNote}
              disabled={!newNote.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {t('saveNote')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;