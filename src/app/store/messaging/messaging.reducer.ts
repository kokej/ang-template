import { MessagingActions, MessagingActionTypes } from './messaging.actions';

export const initialState = null;

export function messagingReducer(state = initialState, action: MessagingActions) {
    switch (action.type) {
        case MessagingActionTypes.SendMessage: {
            return action.payload;
        }
    }
}
