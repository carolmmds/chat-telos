import { MessageCircle, Instagram, Mail, Phone, Globe } from 'lucide-react';

export const getChannelIcon = (channel) => {
  const icons = {
    whatsapp: MessageCircle,
    instagram: Instagram,
    email: Mail,
    phone: Phone,
    webchat: Globe
  };
  return icons[channel] || MessageCircle;
};

export const getChannelColor = (channel) => {
  const colors = {
    whatsapp: 'bg-whatsapp',
    instagram: 'bg-instagram',
    email: 'bg-email',
    phone: 'bg-phone',
    webchat: 'bg-webchat'
  };
  return colors[channel] || 'bg-primary';
};

export const getChannelBadgeColor = (channel) => {
  const colors = {
    whatsapp: 'bg-whatsapp/10 text-whatsapp',
    instagram: 'bg-instagram/10 text-instagram',
    email: 'bg-email/10 text-email',
    phone: 'bg-phone/10 text-phone',
    webchat: 'bg-webchat/10 text-webchat'
  };
  return colors[channel] || 'bg-primary/10 text-primary';
};