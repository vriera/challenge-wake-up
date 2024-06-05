//This is not the most secure way to do it but it can do.
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'super.secret.string',
};
