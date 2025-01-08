import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  userId:Joi.number().min(5).required(),
  images: Joi.array().items(Joi.string().uri()).required(),
});
