export interface CreateUserDTO {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDto {
  token?: string | null;
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
}