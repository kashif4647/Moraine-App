import Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  role: Joi.string().optional(),
});

const validate = async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);

    if (error) {
      if (error.details && error.details.length && error.details[0].message) {
        return res.status(400).json({ message: error.details[0].message });
      }
      return res.status(400).json({ message: error.message });
    }
    return next();
  } catch (error) {
    if (error.details && error.details.length && error.details[0].message) {
      return res.status(400).json({ message: error.details[0].message });
    }
    return res.status(400).json({ message: error.message });
  }
};

export default validate;
