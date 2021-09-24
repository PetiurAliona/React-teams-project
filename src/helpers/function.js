export const setErrorStatus = (error) => {
  return {
    status: +error.message.slice(-3),
    message: error.message,
  };
};
