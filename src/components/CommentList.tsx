"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchCommentsQuery } from "@/lib/services/comments";

const CommentList = () => {
  console.log("test trigger comment list rendering");
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const router = useRouter();

  const { data, isLoading } = useFetchCommentsQuery(page ? parseInt(page) : 1);

  // this use effect is only for show when the component is mounted and destroyed
  useEffect(() => {
    console.log("test mount comment list");
    return () => {
      console.log("test cleanup comment list");
    };
  }, []);

  if (!data || isLoading) return <>loading...</>;

  // callback that triggers a server reload
  // const nextPageCallback = () => router.push(`/comments?page=${data.page + 1}`);

  // callback that not triggers a server reload
  const nextPageCallback = () => window.history.pushState(null, "", `/comments?page=${data.page + 1}`);

  const fakeUpdateOtherQueryStringParams = () =>
    window.history.pushState(null, "", `/comments?page=${data.page}&fake=1`);

  return (
    <div>
      <div>
        <h2>PostList</h2>
      </div>
      <div>
        page: {data.page}, per_page: {data.per_page}, total: {data.total}{" "}
        {data.page && <button onClick={nextPageCallback}>next</button>}
        &nbsp;{data.page && <button onClick={fakeUpdateOtherQueryStringParams}>testfakechange</button>}
        &nbsp;<button onClick={() => router.push(`/`)}>home</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>post_id</th>
              <th>name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {data.comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.post_id}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentList;
