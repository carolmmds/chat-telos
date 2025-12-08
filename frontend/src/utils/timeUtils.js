export const formatRelativeTime = (timestamp, t) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return t('now');
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${t('minutesAgo')}`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${t('hoursAgo')}`;
  } else if (diffInDays === 1) {
    return t('yesterday');
  } else {
    return `${diffInDays} ${t('daysAgo')}`;
  }
};

export const formatMessageTime = (timestamp) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const formatFullDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};