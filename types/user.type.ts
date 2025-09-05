export interface UserRegister {
  username: string;
  email: string;
  password: string;
  namaLengkap: string;
  nomorTelepon?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}


export interface UserRegisterResponse {
  detail: string;
  data: {
    id: string;
    username: string;
    email: string;
    namaLengkap: string;
    nomorTelepon?: string;
  };
}