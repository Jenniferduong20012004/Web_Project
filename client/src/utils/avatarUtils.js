export const avatarColors = [
  "bg-blue-700",
  "bg-orange-500",
  "bg-purple-600",
  "bg-green-600",
  "bg-red-600",
];

export const getAvatarColor = (index) => {
  return avatarColors[index % avatarColors.length];
};

export const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
