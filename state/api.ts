import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";
export interface NavidromeAuthArgs {
  url: string;
  user: string;
  password: string;
}
export const navidromeApi = createApi({
  reducerPath: "navidromeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    testConnection: builder.query<any, NavidromeAuthArgs>({
      query: ({ url, user, password }) => {
        const salt = Math.random().toString(36).substring(2);
        const token = md5(password + salt);
        return {
          url: `${url}/rest/ping.view`,
          params: {
            u: user,
            t: token,
            s: salt,
            v: "1.16.1",
            c: "MyReactMusicApp",
            f: "json",
          },
        };
      },
    }),
  }),
});

export const { useLazyTestConnectionQuery } = navidromeApi;
