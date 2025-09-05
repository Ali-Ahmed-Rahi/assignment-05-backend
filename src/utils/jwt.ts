import jwt from 'jsonwebtoken';

export const signToken = (payload: object, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
    role: 'admin' | 'rider' | 'driver';
  };
};
