import { LoadingActions, LoadingActionsTypes } from './loading.actions';

export const initialState = false;

export function loadingReducer(state = initialState, action: LoadingActions) {
    switch (action.type) {
        case LoadingActionsTypes.SetLoadingStatus: {
            return action.payload;
        }
    }
}
