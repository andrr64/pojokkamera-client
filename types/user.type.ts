export interface UserBase {
  username?: string;
  email: string;
  password?: string;
  namaLengkap?: string;
  nomorTelepon?: string;
}

export interface UserRegister extends UserBase {
  username: string;
  password: string;
  namaLengkap: string;
}

export interface UserLogin extends UserBase {
  password: string;
}

export interface UserDataResponse extends Omit<UserBase, 'password'> {
  dibuatPada: string;
}

export interface UserRegisterResponse extends UserDataResponse {

}