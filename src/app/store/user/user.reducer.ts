import { UserActions, UserActionTypes } from './user.actions';

export const initialState = null;

export function userReducer(state = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.SetUser: {
            return action.payload;
        }
        case UserActionTypes.ResetUser:
            return initialState;
        case UserActionTypes.GetUser:
        default:
            return state;
    }
}
