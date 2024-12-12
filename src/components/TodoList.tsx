"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTodos, GetTodosResponse } from "@/lib/gorestapi";

const TodoList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const router = useRouter();

  const [data, setData] = useState<GetTodosResponse | null>(null);

  useEffect(() => {
    getTodos(page ? parseInt(page) : 1).then((res) => setData(res));
  }, [page]);

  // this use effect is only for show when the component is mounted and destroyed
  useEffect(() => {
    console.log("test mount todos list");
    return () => {
      console.log("test cleanup todos list");
    };
  }, []);

  if (!data) return <>loading...</>;

  // callback that triggers a server reload
  const nextPageCallback = () => router.push(`/todos?page=${data.page + 1}`);

  // callback that not triggers a server reload
  // const nextPageCallback = () => window.history.pushState(null, "", `/todos?page=${data.page + 1}`);

  return (
    <div>
      <div>
        <h2>TodoList</h2>
      </div>
      <div>
        page: {data.page}, per_page: {data.per_page}, total: {data.total}{" "}
        {data.page && <button onClick={nextPageCallback}>next</button>}
        &nbsp;<button onClick={() => router.push(`/`)}>home</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
