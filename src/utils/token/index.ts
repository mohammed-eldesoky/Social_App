import jwt , { SignOptions } from "jsonwebtoken";

//_________generate token _______

export const generateToken = ({
  payload,
  secretKey =process.env.SECRET_KEY as string,
  options,
}: {
  payload: object;
  secretKey?: string;
  options?: SignOptions;
}) => {
return  jwt.sign(payload,secretKey, options);
};
