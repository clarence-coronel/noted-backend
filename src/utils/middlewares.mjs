export const validateSession = (request, response, next) => {
  if (!request.user) return response.sendStatus(401);
  next();
};
