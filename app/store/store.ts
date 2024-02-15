import { create } from "zustand"

type Store = {
    databases: any;
    databaseData: any;
    user: any;
    isLoading: boolean;
};

const InitialState: Store = {
    databases: null,
    databaseData: null,
    user: null,
    isLoading: false,
}

export const useAuthStore = create((set) => ({
    ...InitialState,
    setDatabasesStore: ({ databases, user }: any) => set({ databases, user, isLoading: false }),
    setDatabaseData: ({ databaseData }: any) => set({ databaseData, isLoading: false }),
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
}));