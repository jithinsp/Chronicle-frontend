import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

// export const login = createAction('[User] Login', props<{ username: string, password: string }>());
// export const register = createAction('[User] Register', props<{ user: User }>());
// export const updateUser = createAction('[User] Update User', props<{ user: User }>());
// export const deleteUser = createAction('[User] Delete User', props<{ Id: number }>());

// export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());

export const LOAD_USER='[user page]load user'
export const LOAD_USER_SUCCESS='[user page]load user success'
export const LOAD_USER_FAIL='[user page]load user failure'

export const loadUser = createAction(LOAD_USER);
export const loadUsersSuccess = createAction(LOAD_USER_SUCCESS,props<{list:User[]}>());
export const loadUserFail = createAction(LOAD_USER_FAIL,props<{errormessage:string}>());
