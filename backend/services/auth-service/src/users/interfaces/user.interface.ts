export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    isVerified: boolean;
    verificationToken: string;
  }
  