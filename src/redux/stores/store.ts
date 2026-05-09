import {
    configureStore,
    combineReducers,
} from "@reduxjs/toolkit";

import authReducer from '../slices/authSlice';

import storage
    from "redux-persist/lib/storage";

import {
    persistReducer,
    persistStore,
} from "redux-persist";
import {
    vaccinationRecordApi,
} from "../apis/vaccinationRecordApi";
import {
    dashboardApi,
} from "../apis/dashboardApi";
import {
    activityApi,
} from "../apis/activityApi";

const rootReducer =
    combineReducers({
        auth: authReducer,
        [vaccinationRecordApi.reducerPath]: vaccinationRecordApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [activityApi.reducerPath]: activityApi.reducer,
    });

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer =
    persistReducer(
        persistConfig,
        rootReducer
    );

export const store =
    configureStore({
        reducer:
            persistedReducer,

        middleware:
            (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck:
                        false,
                }).concat(
                    vaccinationRecordApi.middleware,
                    dashboardApi.middleware,
                    activityApi.middleware

                ),

    });

export const persistor =
    persistStore(store);

export type RootState =
    ReturnType<
        typeof store.getState
    >;

export type AppDispatch =
    typeof store.dispatch;