import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    imageUrl: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token =
                action.payload.token;

            state.user =
                action.payload.user;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const {
    setCredentials,
    logout
} = authSlice.actions;

export default authSlice.reducer;