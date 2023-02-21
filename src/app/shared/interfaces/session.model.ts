import { userInterface } from './user.model';

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
}