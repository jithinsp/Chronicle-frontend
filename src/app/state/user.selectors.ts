import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../user.model";
import { state } from "@angular/animations";

const getuserstate = createFeatureSelector<UserModel>('user');

export const getuserlist = createSelector(getuserstate,(state)=>{
    return state.list;
})