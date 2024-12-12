"use server";

import StoreProvider from "@/app/StoreProvider";
import CommentList from "@/components/CommentList";

export default async function CommentListPage() {
  console.log("CommentListPage Rendering");
  return (
    <StoreProvider>
      <CommentList />
    </StoreProvider>
  );
}
