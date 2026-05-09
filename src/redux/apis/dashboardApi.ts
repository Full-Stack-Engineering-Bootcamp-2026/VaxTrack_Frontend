import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../stores/store";

interface ComplianceResponse {
    complianceRate: number;
}

interface StatusBreakdownResponse {
    upcoming: number;
    overdue: number;
    completed: number;
}

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCompliance: builder.query<ComplianceResponse, void>({
            query: () => "/vaccination-record/compliance",
        }),
        getStatusBreakdown: builder.query<StatusBreakdownResponse, void>({
            query: () => "/vaccination-record/status-breakdown",
        }),
    }),
});

export const { useGetComplianceQuery, useGetStatusBreakdownQuery } = dashboardApi;