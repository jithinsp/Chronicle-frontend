export interface User {
    id: number;
    name: string;
    email: string;
    passsword: string;
    role: string;
    isActive: boolean;
  }

  export interface UserModel{
    list: User[],
    userObj: User,
    errormessage: string
  }