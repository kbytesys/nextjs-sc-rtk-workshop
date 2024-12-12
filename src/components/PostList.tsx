"use client";

import { GetPostsResponse } from "@/lib/gorestapi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface PostsListProps {
  initialData: GetPostsResponse;
}

const PostList = ({ initialData }: PostsListProps) => {
  const router = useRouter();

  // this use effect is only for show when the component is mounted and destroyed
  useEffect(() => {
    console.log("test mount post list");
    return () => {
      console.log("test cleanup post list");
    };
  }, []);

  if (!initialData) return <>loading...</>;

  // callback that triggers a server reload
  const nextPageCallback = () => router.push(`/posts?page=${initialData.page + 1}`);

  return (
    <div>
      <div>
        <h2>PostList</h2>
      </div>
      <div>
        page: {initialData.page}, per_page: {initialData.per_page}, total: {initialData.total}{" "}
        {initialData.page && <button onClick={nextPageCallback}>next</button>}
        &nbsp;<button onClick={() => router.push(`/`)}>home</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>user_id</th>
            </tr>
          </thead>
          <tbody>
            {initialData.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;
