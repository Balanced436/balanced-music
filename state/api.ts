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
  streamingUrl: string;
};

const getNavidromeParams = (user: string, password: string) => {
  const salt = Math.random().toString(36).substring(2);
  return {
    u: user,
    t: md5(password + salt),
    s: salt,
    v: "1.16.1",
    c: "MyApp",
    f: "json"
  };
};


export const navidromeApi = createApi({
  reducerPath: "navidromeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    testConnection: builder.query<any, NavidromeAuthArgs>({
      query: ({ url, user, password }) => {
        const authParams = getNavidromeParams(user,password)
        return {
          url: `${url}/rest/ping.view`,
          params: {...authParams},
        };
      },
    }),

    getSongs: builder.query<NavidromeSongType[], NavidromeAuthArgs>({
      query: ({ url, user, password }) => {
        const authParams = getNavidromeParams(user,password)


        return {
          url: `${url}/rest/search3`,
          params: {...authParams},
        };
      },
    transformResponse: (response: any, _, arg: NavidromeAuthArgs): NavidromeSongType[] => {
      const { url, user, password } = arg;
      const authParams = getNavidromeParams(user, password);
      const songs = response?.["subsonic-response"]?.searchResult3?.song || [];

      return songs.map((song: any) => {
        const queryParams = new URLSearchParams({ 
          ...authParams, 
          id: song.id 
        }).toString();

        return {
          ...song,
          streamingUrl: `${url}/rest/stream.view?${queryParams}`
        };
      });
    }
    }),
  }),
});

export const { useLazyTestConnectionQuery, useGetSongsQuery } = navidromeApi;
