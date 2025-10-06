export interface TokenModel {
  aud: string;
  iat: number;
  exp: number;
  uid: string;
  claims: {
    login_id: string;
    email: string;
    user_id: string;
  };
}
