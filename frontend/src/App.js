import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InfoPanel from './components/InfoPanel';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { mockConversations, mockTemplates, mockNotes } from './data/mockData';

function App() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [templates] = useState(mockTemplates);
  const [notes, setNotes] = useState(mockNotes);

  // Auto-select first conversation on load
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation]);

  // Handle sending messages
  const handleSendMessage = (text, attachments = []) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      text,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      status: 'sent',
      attachments
    };

    // Update conversations with new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: text,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });

    // Simulate auto-response after 2-3 seconds
    setTimeout(() => {
      simulateResponse();
    }, 2000 + Math.random() * 1000);
  };

  // Simulate customer response
  const simulateResponse = () => {
    const responses = [
      'Obrigado! Isso ajuda muito.',
      'Thank you for your help!',
      'Perfeito, entendi.',
      'Great, that works for me.',
      'Posso fazer mais alguma pergunta?',
      'Can you help me with something else?'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const autoMessage = {
      id: Date.now(),
      text: randomResponse,
      sender: 'customer',
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, autoMessage],
          lastMessage: randomResponse,
          lastMessageTime: new Date().toISOString(),
          unreadCount: conv.unreadCount + 1
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, autoMessage]
    }));
  };

  // Handle conversation selection
  const handleSelectConversation = (conv) => {
    // Mark as read
    const updatedConversations = conversations.map(c => 
      c.id === conv.id ? { ...c, unreadCount: 0 } : c
    );
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.id === conv.id));
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle status change
  const handleStatusChange = (newStatus) => {
    if (!selectedConversation) return;

    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id ? { ...conv, status: newStatus } : conv
    );
    setConversations(updatedConversations);
    setSelectedConversation({ ...selectedConversation, status: newStatus });
  };

  // Handle add note
  const handleAddNote = (noteText) => {
    if (!selectedConversation || !noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      conversationId: selectedConversation.id,
      text: noteText,
      author: 'Current Agent',
      timestamp: new Date().toISOString()
    };

    setNotes([...notes, newNote]);
  };

  // Get notes for selected conversation
  const conversationNotes = selectedConversation 
    ? notes.filter(note => note.conversationId === selectedConversation.id)
    : [];

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="h-screen flex overflow-hidden bg-background">
          {/* Left Sidebar - Conversations List */}
          <Sidebar 
            conversations={filteredConversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Center - Chat Area */}
          <ChatArea 
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
            onToggleInfoPanel={() => setShowInfoPanel(!showInfoPanel)}
            templates={templates}
          />

          {/* Right Sidebar - Info Panel */}
          {showInfoPanel && selectedConversation && (
            <InfoPanel 
              conversation={selectedConversation}
              notes={conversationNotes}
              onStatusChange={handleStatusChange}
              onAddNote={handleAddNote}
            />
          )}

          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;