import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://127.0.0.1:3000/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "payments/intents",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCreatePaymentIntentMutation } =
  apiSlice;
