"use server";

import { getPosts } from "@/lib/gorestapi";
import StoreProvider from "@/app/StoreProvider";
import PostListClientNav from "@/components/PostListClientNav";

export default async function PostsListPageClientNav({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log("PostsListPageClientNav Rendering");
  const { page } = await searchParams;
  const posts = await getPosts(page ? parseInt(page as string) : 1);

  return (
    <StoreProvider postsList={posts}>
      <PostListClientNav />
    </StoreProvider>
  );
}
