export const formatLastChatTime = (timestamp: string): string => {
  const chatDate = new Date(timestamp);
  const now = new Date();

  const isToday =
    chatDate.getFullYear() === now.getFullYear() &&
    chatDate.getMonth() === now.getMonth() &&
    chatDate.getDate() === now.getDate();

  if (isToday) {
    return chatDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간제 사용
    });
  } else {
    return chatDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
};
