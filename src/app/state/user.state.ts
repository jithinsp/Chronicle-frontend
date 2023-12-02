import { User, UserModel } from "../user.model";

export const UserState: UserModel={
    list:[],
    errormessage:'',
    userObj:{
        id: 0,
        name: "",
        email: "",
        passsword: "",
        role: "ROLE_USER",
        isActive: true
    }
}