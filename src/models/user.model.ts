/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import { USER_ROLES } from '../components/constants';
import { User } from '../interfaces/user.interface';

const { Schema } = mongoose;

const userSchema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.keys(USER_ROLES),
    default: USER_ROLES.user,
  },
});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
