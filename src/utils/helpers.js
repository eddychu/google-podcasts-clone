export const trimString = (string, maxLength) => {
  return string.length > maxLength
    ? string.substring(0, maxLength - 3) + "..."
    : string;
};

export const formatDuration = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  let parts = [];
  parts.push(minutes.toString().padStart(2, "0"));
  parts.push(remainingSeconds.toString().padStart(2, "0"));

  return parts.join(":");
};
