import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_API }),
  reducerPath: "adminApi",
  tagTypes: [
    "Vehicles",
    "Maintenances"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getVehicles: build.query({
      query: () => ({
        url: "vehicles",
        method: "GET"
      }),
      providesTags: ["Vehicles"],
    }),
    getMaintenances: build.query({
      query: (id) => ({
        url: "maintenance/get-maintenance-all-vehicle",
        method: "GET",
      }),
      providesTags: ["Maintenances"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetVehiclesQuery,
  useGetMaintenancesQuery,
} = api;
