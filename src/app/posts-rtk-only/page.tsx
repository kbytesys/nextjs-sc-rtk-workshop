"use server";

import StoreProvider from "@/app/StoreProvider";
import PostListRTKOnly from "@/components/PostListRTKOnly";

export default async function PostsListPageRTKOnly() {
  console.log("PostsListPageRTKOnly Rendering");
  return (
    <StoreProvider>
      <PostListRTKOnly />
    </StoreProvider>
  );
}
