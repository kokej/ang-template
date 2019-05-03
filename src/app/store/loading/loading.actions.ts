import { Action } from '@ngrx/store';

export enum LoadingActionsTypes {
    SetLoadingStatus = '[Loading Component] SetLoadingStatus'
}

export class SetLoadingStatus implements Action {
    readonly type = LoadingActionsTypes.SetLoadingStatus;
    constructor(public payload: boolean) {}
}

export type LoadingActions = SetLoadingStatus;
