import { create } from "zustand";

interface UserRoleType {
    userRole: "ADMIN" | "CUSTOMER";
};

interface UserInfoType {
    userId: string;
    name: string;
    userRole: UserRoleType;
};

interface UserStore {
    user: UserInfoType;
    setUser: (data: UserInfoType) => void;
};

const useUserInfoStore = create<UserStore>((set) => ({
    user: {
        userId: "",
        name: "",
        userRole: { userRole: "CUSTOMER" },
    },
    setUser: (data) => set({ user: data }),
}));

export { useUserInfoStore };