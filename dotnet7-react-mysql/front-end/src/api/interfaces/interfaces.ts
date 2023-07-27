
export interface IResult {
    statusCode: number;
    data: any;
    message: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
}

export interface IApiTokens {
    token: string;
    refreshToken: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    id: number;
    roleId: number;
    emailConfirmed: boolean;
    tokens: IApiTokens;
}