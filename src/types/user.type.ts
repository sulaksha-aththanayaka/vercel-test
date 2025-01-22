import  {  Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}

export type RegisterUserRequest = {
  id?: string;
  email: string;
  password: string;
}

export type RegisterUserResponse = {
  id?: string;
  email: string;
  isValidPassword(password: string): Promise<boolean>;
}

export type LoginUserRequest =  {
  id?: string;
  email: string;
  password: string;
}

export type LoginUserResponse =  {
  id?: string;
  email: string;
  isValidPassword(password: string): Promise<boolean>;
}

