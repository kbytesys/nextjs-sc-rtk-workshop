"use server";

import { getPosts } from "@/lib/gorestapi";
import StoreProvider from "@/app/StoreProvider";
import PostList from "@/components/PostList";

export default async function PostsListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log("PostsListPage Rendering");
  const { page } = await searchParams;
  const posts = await getPosts(page ? parseInt(page as string) : 1);

  /*
   * Warning: if you use a per-route state, you must follow this
   * link https://redux-toolkit.js.org/usage/nextjs#per-route-state too
   * if you use the redux state selectors and the data does not update
   */

  return (
    <StoreProvider postsList={posts}>
      <PostList initialData={posts} />
    </StoreProvider>
  );
}
