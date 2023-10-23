export interface IContact {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  user_id: string;
}
export interface IPartialContact extends Partial<IContact> {}

export interface IUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
}
export interface IUserProfile extends IUser {
  contacts: IContact[];
}
