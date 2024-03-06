import { NotionDatabasePropertiesType, getDatabaseDataById, getDatabases } from "@actions/notion-actions";
import { MistralSuggestionsType, getAISuggestions, getAIChartData } from "@actions/mistral-actions";
import { create } from "zustand";

type InitialStateType = {
    databases: any;
    databaseSelectedId: null;
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
    databaseSelectedId: null,
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
    databaseSelectedId: null;
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
    currentDatabase?: {
        id: string | null,
        title: string | null,
    },
    getDatabases: () => void;
    getSuggestions: ({ databaseId }: { databaseId: string }) => void;
    getSuggestedChart: (item: MistralSuggestionsType) => void;
    setUserInfo: (userInfo: any) => void;
    setIsLoading: () => void;
    setCurrentDatabase: (database: { id: string | null, title: string | null }) => void;
    clearSessionStore: () => void;
};

const useAppStore = create<StoreType>((set: any) => ({
    ...InitialState,
    userInfo: null,
    setUserInfo: () => { },
    getDatabases: async () => {
        set({ isLoading: true, flags: { isDatabasesLoading: true } });
        const databasesData = await getDatabases();
        return set({ databases: databasesData, isLoading: false, flags: { isDatabasesLoading: false } })
    },
    getSuggestions: async ({ databaseId }: { databaseId: string }) => {
        set({ isLoading: true, flags: { isSuggestionsLoading: true, isExtractingDatabaseByIdData: true, isPanelReady: false } });
        const currentDatabases = useAppStore.getState().databases;
        const currentDatabase = currentDatabases.find((item: any) => item.id === databaseId);

        const databaseByIdData = await getDatabaseDataById({ databaseId, isToGetSuggestions: true, pageLimit: 5 });
        const mistralSuggestions = await getAISuggestions({ databaseInfo: databaseByIdData as NotionDatabasePropertiesType[] });
        if (currentDatabase) {
            set({ currentDatabase: { id: currentDatabase.id, title: currentDatabase.title } });
        }
        return set((state: any) => ({ ...state, databaseSelectedId: databaseId, suggestions: mistralSuggestions, isExtractingDatabaseByIdData: false, isLoading: false, flags: { isSuggestionsLoading: false, shouldCloseInitialCollapsible: true, isPanelReady: true } }))
    },
    getSuggestedChart: (item: MistralSuggestionsType) => {
        const databaseSelectedId = useAppStore.getState().databaseSelectedId;
        if (databaseSelectedId) {
            const chartData = getAIChartData({ databaseId: databaseSelectedId, ...item })
        }
    },
    setCurrentDatabase: (database: { id: string | null, title: string | null }) => set({ currentDatabase: database }),
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
}));

export { useAppStore };
