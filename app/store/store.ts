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
        shouldCloseInitialCollapsible: boolean;
        isExtractingDatabaseByIdData: boolean;
        isPanelReady: boolean;
    },
    currentDatabase: {
        id: string | null;
        title: string | null;
    }
};

const InitialState: InitialStateType = {
    databases: null,
    databaseByIdInfo: null,
    suggestions: [],
    isLoading: false,
    flags: {
        isDatabasesLoading: false,
        isSuggestionsLoading: false,
        shouldCloseInitialCollapsible: false,
        isExtractingDatabaseByIdData: false,
        isPanelReady: false,
    },
    currentDatabase: {
        id: null,
        title: null,
    }
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
        shouldCloseInitialCollapsible: boolean;
        isExtractingDatabaseByIdData: boolean;
        isPanelReady: boolean
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
        set({ isLoading: true, flags: { isSuggestionsLoading: true, isExtractingDatabaseByIdData: true, isPanelReady: false } });
        const databaseIdData = await getDatabaseDataById({ databaseId, onlyNullProps: true });
        const mistralSuggestions = await getAISuggestions({ databaseInfo: databaseIdData as NotionDatabasePropertiesType[] });
        return set((state : any) => ({ ...state, suggestions: mistralSuggestions, isExtractingDatabaseByIdData: false,  isLoading: false, flags: { isSuggestionsLoading: false, shouldCloseInitialCollapsible: true, isPanelReady: true } }))
    },
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
})));

export { useAppStore };
