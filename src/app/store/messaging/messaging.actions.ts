import { Action } from '@ngrx/store';

export enum MessagingActionTypes {
    SendMessage = '[Messaging Component] SendMessage'
}

export class SendMessage implements Action {
    readonly type = MessagingActionTypes.SendMessage;
    constructor(
        public payload: {
            text: string;
            type: string;
        }
    ) {}
}

export type MessagingActions = SendMessage;
