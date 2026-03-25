import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";

export interface NavidromeAuthArgs {
  url: string;
  user: string;
  password: string;
}

export type NavidromeSongType = {
  title: string;
  id: string;
  album: string;
  artist: string;
};

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

    getSongs: builder.query<NavidromeSongType[], NavidromeAuthArgs>({
      query: ({ url, user, password }) => {
        const salt = Math.random().toString(36).substring(2);
        const token = md5(password + salt);

        return {
          url: `${url}/rest/search3`,
          params: {
            u: user,
            t: token,
            s: salt,
            v: "1.16.1",
            c: "MyReactMusicApp",
            f: "json",
            songCount: 500,
          },
        };
      },
      transformResponse: (response: any): NavidromeSongType[] => {
        console.info(response);
        return response?.["subsonic-response"]?.searchResult3?.song || [];
      },
    }),
  }),
});

export const { useLazyTestConnectionQuery, useGetSongsQuery } = navidromeApi;
