export interface UserData {
  email: string;
  login_id: string;
  user_id: string;
}
export interface LoginResponseType {
  customToken: string;
  message: string;
  statusCode: number;
  success: boolean;
  user: UserData;
}
