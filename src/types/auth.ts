import { ReactElement } from 'react';

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

// export type UserProfile = {
//   id?: string;
//   email?: string;
//   avatar?: string;
//   image?: string;
//   // name?: string;
//   first_name?: string;
//   last_name?: string;
//   role?: string;
//   tier?: string;
// };

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: any;
};
