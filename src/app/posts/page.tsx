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

  return (
    <StoreProvider postsList={posts}>
      <PostList initialData={posts} />
    </StoreProvider>
  );
}
