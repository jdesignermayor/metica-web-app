import { NotionDatabasePropertiesType, getDatabaseDataById, getDatabases } from "@actions/notion-actions";
import { MistralSuggestionsType, getAISuggestions } from "@actions/mistral-actions";
import { create } from "zustand";

type InitialStateType = {
    databases: any;
    databaseSelectedId: null;
    comments: Array<CommentType> | [];
    suggestions: [];
    isLoading: boolean;
    flags: {
        isDatabasesLoading: boolean;
        isSuggestionsLoading: boolean;
        shouldCloseInitialCollapsible: boolean;
        isExtractingDatabaseByIdData: boolean;
        isRefreshingSuggestions: boolean;
        isLoadingComment: boolean;
        isPanelReady: boolean;
    },
    currentDatabase: {
        id: string | null;
        title: string | null;
    }
};

type CommentType = {
    id: number;
    message: string;
    chartComponent?: any;
    isSuggest?: boolean;
    isChartReady?: boolean;
}

type StoreType = {
    databases: any;
    databaseSelectedId: null | string;
    comments: Array<CommentType> | [];
    suggestions: Array<MistralSuggestionsType> | [];
    userInfo: null;
    isLoading: boolean;
    flags: {
        isDatabasesLoading: boolean | null;
        isSuggestionsLoading: boolean | null;
        isLoadingComment?: boolean | null;
        isExtractingDatabaseByIdData: boolean | null;
        isRefreshingSuggestions: boolean | null;
        isPanelReady: boolean | null;
        shouldCloseInitialCollapsible: boolean | null;
    },
    currentDatabase?: {
        id: string | null,
        title: string | null,
    },
    getDatabases: () => void;
    getSuggestions: ({ databaseId, isInitial }: { databaseId?: string, isInitial: boolean }) => void;
    setIsLoading: () => void;
    setCurrentDatabase: (database: { id: string | null, title: string | null }) => void;
    clearSessionStore: () => void;
};

const InitialState: InitialStateType = {
    databases: null,
    databaseSelectedId: null,
    comments: [],
    suggestions: [],
    isLoading: false,
    flags: {
        isDatabasesLoading: false,
        isSuggestionsLoading: false,
        isExtractingDatabaseByIdData: false,
        isLoadingComment: false,
        isRefreshingSuggestions: false,
        isPanelReady: false,
        shouldCloseInitialCollapsible: false,
    },
    currentDatabase: {
        id: null,
        title: null,
    }
}

const INITIAL_COMMENT: CommentType = {
    id: 0,
    message: `Welcome to Metica! Let's kick things off by leveraging your data. Below, you'll find a selection of suggested charts tailored to your dataset.`,
}

const useAppStore = create<StoreType>((set: any) => ({
    ...InitialState,
    userInfo: null,
    getDatabases: async () => {
        set({ isLoading: true, flags: { isDatabasesLoading: true } });
        const databasesData = await getDatabases();
        return set({ databases: databasesData, isLoading: false, flags: { isDatabasesLoading: false } })
    },
    getSuggestions: async ({ databaseId = '', isInitial }: { databaseId?: string, isInitial: boolean }) => {
        const currentDatabases = useAppStore.getState().databases;
        const currentDatabase = currentDatabases.find((item: any) => item.id === databaseId);

        if (isInitial) {
            set({ isLoading: true, flags: { isSuggestionsLoading: true, isExtractingDatabaseByIdData: true, isPanelReady: false } });
        } else {
            set({ flags: { isRefreshingSuggestions: true, isPanelReady: true } });
        }

        const currentDatabaseId = isInitial ? databaseId : useAppStore.getState().databaseSelectedId as string;

        const databaseByIdData = await getDatabaseDataById({ databaseId: currentDatabaseId, isToGetSuggestions: true, pageLimit: 5 });
        const mistralSuggestions = await getAISuggestions({ databaseInfo: databaseByIdData as NotionDatabasePropertiesType[] });

        if (isInitial) {
            return set((state: any) => ({ ...state, comments: [INITIAL_COMMENT], currentDatabase: currentDatabase, databaseSelectedId: currentDatabaseId, suggestions: mistralSuggestions, isExtractingDatabaseByIdData: false, isLoading: false, flags: { isSuggestionsLoading: false, shouldCloseInitialCollapsible: true, isPanelReady: true } }))
        }
        console.log('mistralSuggestions:', mistralSuggestions)

        return set((state: any) => ({ ...state, databaseSelectedId: currentDatabaseId, suggestions: mistralSuggestions, isExtractingDatabaseByIdData: false, isLoading: false, flags: { isRefreshingSuggestions: false, isPanelReady: true } }))
    },
    getChatResponse: async () => { },
    addComment: (comment: CommentType) => set((state: any) => {
        set({ isLoadingComment: true });
        return { comments: [...state.comments, comment] }
    }),
    setCurrentDatabase: (database: { id: string | null, title: string | null }) => set({ currentDatabase: database }),
    setIsLoading: () => set({ isLoading: true }),
    clearSessionStore: () => set(InitialState),
}));

export { useAppStore };
