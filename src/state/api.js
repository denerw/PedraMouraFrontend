import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Admins",
    "Sales",
    "Dashboard",
    "Vehicles",
    "Maintenances",
    "Users"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getVehicles: build.query({
      query: () => ({
        url: "api/vehicles",
        method: "GET"
      }),
      providesTags: ["Vehicles"],
    }),
    getMaintenances: build.query({
      query: (id) => ({
        url: "api/maintenances",
        method: "GET",
      }),
      providesTags: ["Maintenances"],
    }),
    getUsers: build.query({
      query: (id) => ({
        url: "client/transactions",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,
  useGetVehiclesQuery,
  useGetMaintenancesQuery,
  useGetUsersQuery,
} = api;
