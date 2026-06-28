export interface LoginResponse {
  token: string;
  email: string;
}

export interface AppleUser {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
}
