export interface IUser {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  };
  token: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}
