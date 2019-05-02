export type UserFormTypes = 'login-user' | 'register-user' | 'forgot-pwd';
export interface UserFormType {
    type: UserFormTypes;
    user: {
        email: string;
        password: string;
    };
    loginProvider?: 'google';
}
