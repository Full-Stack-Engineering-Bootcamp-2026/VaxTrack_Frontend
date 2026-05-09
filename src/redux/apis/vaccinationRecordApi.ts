import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../stores/store";

export interface VaccinationRecord {
  id: number;
  dependent: {
    fullName: string;
  };
  vaccine: {
    name: string;
  };
  status: "COMPLETED" | "UPCOMING" | "OVERDUE";
  dueDate: string;
  administeredBy?: {
    fullName: string;
  };
}

export interface VaccinationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface VaccinationResponse {
  data: VaccinationRecord[];
  pagination: VaccinationPagination;
}

export const vaccinationRecordApi = createApi({
  reducerPath: "vaccinationRecordApi",
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
    getUpcomingVaccinations: builder.query<
      VaccinationResponse,
      {
        page: number;
        limit: number;
      }
    >({
      query: ({ page, limit }) =>
        `/vaccination-record/upcoming?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetUpcomingVaccinationsQuery } = vaccinationRecordApi;