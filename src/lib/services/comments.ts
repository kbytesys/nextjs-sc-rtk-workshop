import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getComments } from "@/lib/gorestapi";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2/comments/" }),
  endpoints: (builder) => ({
    fetchComments: builder.query({
      queryFn: async (page: number) => {
        console.log("fetching comment list");
        return { data: await getComments(page) };
      },
    }),
  }),
});

export const { useFetchCommentsQuery } = commentsApi;
