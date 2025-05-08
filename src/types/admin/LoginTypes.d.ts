// 관리자 로그인을 처리하기 위한 POST 메소드 타입
type IPostLoginResquestType = {
    username: string;
    password: string;
};
type IPostLoginResponseType = {
    success: boolean;
};