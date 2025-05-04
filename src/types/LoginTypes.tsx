interface IPostLoginResquestType {
    username: string;
    password: string;
};
interface IPostLoginResponseType {
    success: boolean;
};

export type { IPostLoginResquestType, IPostLoginResponseType };