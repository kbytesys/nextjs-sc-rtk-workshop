"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/rtksc/store";
import { GetPostsResponse } from "@/lib/gorestapi";
import { initializePostList } from "@/lib/rtksc/posts/postsSlice";

export default function StoreProvider({
  postsList,
  children,
}: {
  postsList?: GetPostsResponse;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializePostList(postsList));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
