import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../stores/store";

export interface Activity {
  id: number;
  action: string;
  description: string;
  createdAt: string;
  user: {
    fullName: string;
  };
}

interface ActivityResponse {
  data: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const activityApi = createApi({
  reducerPath: "activityApi",
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
    getRecentActivities: builder.query<ActivityResponse, void>({
      query: () => "/activities/recent?page=1&limit=5",
    }),
  }),
});

export const { useGetRecentActivitiesQuery } = activityApi;