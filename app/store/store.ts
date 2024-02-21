import { MistralSuggestionsType } from "@actions/mistral-actions";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type InitialStateType = {
    databases: any;
    databaseByIdInfo: null;
    suggestions: null;
    userInfo: any;
    isLoading: boolean;
};

const InitialState: InitialStateType = {
    databases: null,
    databaseByIdInfo: null,
    suggestions: null,
    userInfo: null,
    isLoading: false,
}

type StoreType = {
    databases: any;
    databaseByIdInfo: null;
    suggestions: Array<MistralSuggestionsType> | null;
    userInfo: null;
    isLoading: boolean;
    setDatabases?: (databases: any) => void;
    setDatabaseByIdInfo?: (databaseByIdInfo: any) => void;
    setSuggestions?: (suggestions: Array<MistralSuggestionsType>) => void;
    setUserInfo?: (userInfo: any) => void;
    setIsLoading?: () => void;
    clearSessionStore?: () => void;
};

const useAppStore = create<StoreType>()(devtools((set) => ({
    ...InitialState,
    setDatabases: ({ databases, userInfo }: any) => set({ databases, userInfo, isLoading: false }),
    setDatabaseByIdInfo: ({ databaseByIdInfo }: any) => set({ databaseByIdInfo, isLoading: false }),
    setSuggestions: ({ suggestions }: any) => set({ suggestions, isLoading: false }),
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
})));

export { useAppStore };
