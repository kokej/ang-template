import { Action } from '@ngrx/store';

export enum UserActionTypes {
    SetUser = '[User Component] SetUser',
    GetUser = '[User Component] GetUser',
    ResetUser = '[User Component] ResetUser'
}

export class SetUser implements Action {
    readonly type = UserActionTypes.SetUser;
    constructor(
        public payload: {
            displayName: string;
            email: string;
        }
    ) {}
}

export class GetUser implements Action {
    readonly type = UserActionTypes.GetUser;
}

export class ResetUser implements Action {
    readonly type = UserActionTypes.ResetUser;
}

export type UserActions = SetUser | GetUser | ResetUser;
