export const randomBackgroud = (colors) => {
  const randomIndex = Math.round(Math.random() * (colors.length - 1));
  return colors[randomIndex];
};
