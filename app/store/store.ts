import { NotionDatabasePropertiesType, getDatabaseDataById, getDatabases } from "@actions/notion-actions";
import { MistralSuggestionsType, getAISuggestions } from "@actions/mistral-actions";
import { create } from "zustand";
import zukeeper from "zukeeper";

type InitialStateType = {
    databases: any;
    databaseByIdInfo: null;
    suggestions: [];
    isLoading: boolean;
    flags: {
        isDatabasesLoading: boolean;
        isSuggestionsLoading: boolean;
    },
};

const InitialState: InitialStateType = {
    databases: null,
    databaseByIdInfo: null,
    suggestions: [],
    isLoading: false,
    flags: {
        isDatabasesLoading: false,
        isSuggestionsLoading: false,
    },
}

type StoreType = {
    databases: any;
    databaseByIdInfo: null;
    suggestions: Array<MistralSuggestionsType> | [];
    userInfo: null;
    isLoading: boolean;
    flags: {
        isDatabasesLoading: boolean;
        isSuggestionsLoading: boolean;
    },
    getDatabases: () => void;
    getSuggestions: ({ databaseId }: { databaseId: string }) => void;
    setUserInfo: (userInfo: any) => void;
    setIsLoading: () => void;
    clearSessionStore: () => void;
};

const useAppStore = create<StoreType>()(zukeeper((set: any) => ({
    ...InitialState,
    getDatabases: async () => {
        set({ isLoading: true, flags: { isDatabasesLoading: true } });
        const databasesData = await getDatabases();
        return set({ databases: databasesData, isLoading: false, flags: { isDatabasesLoading: false } })
    },
    getSuggestions: async ({ databaseId }: { databaseId: string }) => {
        set({ isLoading: true, flags: { isSuggestionsLoading: true } });
        const databaseIdData = await getDatabaseDataById({ databaseId, onlyNullProps: true });
        const mistralSuggestions = await getAISuggestions({ databaseInfo: databaseIdData as NotionDatabasePropertiesType[] });
        console.log('mistralSuggestions:', mistralSuggestions)
        return set({ suggestions: mistralSuggestions, isLoading: false, flags: { isSuggestionsLoading: false } })
    },
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
})));

export { useAppStore };
