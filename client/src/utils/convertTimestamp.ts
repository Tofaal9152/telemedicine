export const convertTimestamp = (timestamp: string) => {
  return (
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) || "just now"
  );
};
