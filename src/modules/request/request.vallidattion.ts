import { z } from "zod";


const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

//endpoint schema 

export const sendRequestVal = z.object({
  receiverId: objectId,
});

export const acceptRequestVal = z.object({
  requestId: objectId,
});

export const deleteRequestVal = z.object({
  requestId: objectId,
});

export const getAllRequestsVal = z.object({});
