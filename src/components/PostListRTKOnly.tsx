"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/rtksc/hooks";
import { fetchPostsList, postsListSelector } from "@/lib/rtksc/posts/postsSlice";

const PostListRTKOnly = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const router = useRouter();

  const dispatch = useAppDispatch();

  // this use effect is only for show when the component is mounted and destroyed
  useEffect(() => {
    console.log("test mount post list");
    return () => {
      console.log("test cleanup post list");
    };
  }, []);

  useEffect(() => {
    console.log("fetching post list");
    dispatch(fetchPostsList(page ? parseInt(page) : 1));
  }, [dispatch, page]);

  const postslist = useAppSelector(postsListSelector);

  if (!postslist) return <>loading...</>;

  // callback that triggers a server reload
  // const nextPageCallback = () => router.push(`/posts-rtk-only?page=${postslist.page + 1}`);

  // callback that not triggers a server reload
  const nextPageCallback = () => window.history.pushState(null, "", `/posts-rtk-only?page=${postslist.page + 1}`);

  return (
    <div>
      <div>
        <h2>PostList</h2>
      </div>
      <div>
        page: {postslist.page}, per_page: {postslist.per_page}, total: {postslist.total}{" "}
        {postslist.page && <button onClick={nextPageCallback}>next</button>}
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
            {postslist.posts.map((post) => (
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

export default PostListRTKOnly;
