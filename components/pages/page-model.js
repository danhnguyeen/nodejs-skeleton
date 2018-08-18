import mongoose from 'mongoose';
import Joi from 'joi';

const pageSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required field'],
    trim: true,
    minlength: 1
  },
  content: {
    type: String
  }
});

const Page = mongoose.model('Page', pageSchema);

const validate = (page) => {
  const schema = {
    title: Joi.string().required().label('Title'),
    content: Joi.string().label('Content')
  };
  return Joi.validate(page, schema, { abortEarly: false });
};

exports.Page = Page;
exports.validate = validate;
