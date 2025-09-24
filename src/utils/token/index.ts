import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


//_________generate token _______

export const generateToken = ({
  payload,
  secretKey = process.env.SECRET_KEY as string,
  options,
}: {
  payload: object;
  secretKey?: string;
  options?: SignOptions;
}) => {
  return jwt.sign(payload, secretKey, options);
};

//_________verify token _______

export const verifyToken = (
  token: string,
  secretKey: string = process.env.SECRET_KEY as string
) => {
  return jwt.verify(token, secretKey) as JwtPayload;
};
