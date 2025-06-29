export type LoginType = {
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};

export type RegisterType = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};
export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

export type Session = {
  user: {
    id: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};