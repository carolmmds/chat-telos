export const mockConversations = [
  {
    id: 1,
    customer: {
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '+55 11 98765-4321',
      avatar: null,
      initials: 'AS'
    },
    channel: 'whatsapp',
    status: 'open',
    lastMessage: 'Obrigada pela ajuda! Quando posso esperar a entrega?',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
    unreadCount: 2,
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    messages: [
      {
        id: 1,
        text: 'Olá! Preciso de ajuda com meu pedido #12345',
        sender: 'customer',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      },
      {
        id: 2,
        text: 'Olá Ana! Claro, vou verificar seu pedido agora mesmo.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000).toISOString(),
        status: 'read'
      },
      {
        id: 3,
        text: 'Seu pedido está sendo preparado para envio. Deve sair hoje ainda!',
        sender: 'agent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000).toISOString(),
        status: 'read'
      },
      {
        id: 4,
        text: 'Obrigada pela ajuda! Quando posso esperar a entrega?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        status: 'delivered'
      }
    ]
  },
  {
    id: 2,
    customer: {
      name: 'John Davis',
      email: 'john.davis@company.com',
      phone: '+1 555 123-4567',
      avatar: null,
      initials: 'JD'
    },
    channel: 'instagram',
    status: 'open',
    lastMessage: 'Hi! I saw your new product on Instagram. Is it available?',
    lastMessageTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
    unreadCount: 1,
    startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        text: 'Hi! I saw your new product on Instagram. Is it available?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: 'delivered'
      }
    ]
  },
  {
    id: 3,
    customer: {
      name: 'Maria Santos',
      email: 'maria.santos@gmail.com',
      phone: '+55 21 99876-5432',
      avatar: null,
      initials: 'MS'
    },
    channel: 'email',
    status: 'pending',
    lastMessage: 'Aguardando resposta sobre o reembolso solicitado.',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    unreadCount: 0,
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        text: 'Gostaria de solicitar um reembolso do pedido #54321',
        sender: 'customer',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      },
      {
        id: 2,
        text: 'Olá Maria, vou encaminhar sua solicitação para o departamento financeiro.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        status: 'read'
      },
      {
        id: 3,
        text: 'Aguardando resposta sobre o reembolso solicitado.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'read'
      }
    ]
  },
  {
    id: 4,
    customer: {
      name: 'Carlos Mendes',
      email: 'carlos.m@empresa.com.br',
      phone: '+55 11 91234-5678',
      avatar: null,
      initials: 'CM'
    },
    channel: 'phone',
    status: 'resolved',
    lastMessage: 'Problema resolvido. Obrigado pelo atendimento!',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
    unreadCount: 0,
    startTime: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        text: 'Ligação recebida: Cliente relatou problema com login',
        sender: 'agent',
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      },
      {
        id: 2,
        text: 'Problema resolvido após reset de senha. Cliente conseguiu acessar.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      },
      {
        id: 3,
        text: 'Problema resolvido. Obrigado pelo atendimento!',
        sender: 'customer',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      }
    ]
  },
  {
    id: 5,
    customer: {
      name: 'Patricia Costa',
      email: 'patricia.costa@hotmail.com',
      phone: '+55 85 98765-1234',
      avatar: null,
      initials: 'PC'
    },
    channel: 'webchat',
    status: 'open',
    lastMessage: 'Qual é o prazo de entrega para minha região?',
    lastMessageTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    unreadCount: 3,
    startTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        text: 'Olá! Estou interessada em fazer uma compra',
        sender: 'customer',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      },
      {
        id: 2,
        text: 'Olá Patricia! Seja bem-vinda. Como posso ajudá-la?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 59 * 60 * 1000).toISOString(),
        status: 'read'
      },
      {
        id: 3,
        text: 'Qual é o prazo de entrega para minha região?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        status: 'delivered'
      }
    ]
  },
  {
    id: 6,
    customer: {
      name: 'Robert Johnson',
      email: 'robert.j@techcorp.com',
      phone: '+1 415 555-0198',
      avatar: null,
      initials: 'RJ'
    },
    channel: 'email',
    status: 'open',
    lastMessage: 'I need technical support for API integration',
    lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    unreadCount: 1,
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        text: 'I need technical support for API integration',
        sender: 'customer',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: 'delivered'
      }
    ]
  }
];

export const mockTemplates = [
  {
    id: 1,
    title: 'Saudação Inicial',
    titleEn: 'Initial Greeting',
    text: 'Olá! Como posso ajudá-lo hoje?',
    textEn: 'Hello! How can I help you today?'
  },
  {
    id: 2,
    title: 'Verificar Pedido',
    titleEn: 'Check Order',
    text: 'Vou verificar o status do seu pedido agora mesmo.',
    textEn: 'I\'ll check your order status right away.'
  },
  {
    id: 3,
    title: 'Aguardar Resposta',
    titleEn: 'Wait for Response',
    text: 'Por favor, aguarde um momento enquanto verifico isso para você.',
    textEn: 'Please wait a moment while I check this for you.'
  },
  {
    id: 4,
    title: 'Encerramento',
    titleEn: 'Closing',
    text: 'Obrigado por entrar em contato! Se precisar de mais alguma coisa, estou à disposição.',
    textEn: 'Thank you for contacting us! If you need anything else, I\'m here to help.'
  },
  {
    id: 5,
    title: 'Transferir para Supervisor',
    titleEn: 'Transfer to Supervisor',
    text: 'Vou transferir você para um supervisor que poderá ajudá-lo melhor.',
    textEn: 'I\'ll transfer you to a supervisor who can better assist you.'
  }
];

export const mockNotes = [
  {
    id: 1,
    conversationId: 1,
    text: 'Cliente VIP - prioridade alta no atendimento',
    author: 'Agent Maria',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    conversationId: 1,
    text: 'Já teve 3 pedidos anteriores sem problemas',
    author: 'Agent João',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    conversationId: 3,
    text: 'Aguardando aprovação do departamento financeiro',
    author: 'Agent Carlos',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];