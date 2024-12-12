export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface Todo {
  id: string;
  title: string;
  status: string;
  user_id: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  user_id: string;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
  post_id: string;
}

interface GorestListBaseResponse {
  page: number;
  per_page: number;
  total: number;
}

export interface GetUsersResponse extends GorestListBaseResponse {
  users: User[];
}

export interface GetTodosResponse extends GorestListBaseResponse {
  todos: Todo[];
}

export interface GetPostsResponse extends GorestListBaseResponse {
  posts: Post[];
}

export interface GetCommentsResponse extends GorestListBaseResponse {
  comments: Comment[];
}

export const getUsers = async (page?: number): Promise<GetUsersResponse> => {
  const pageParam = page ? `?page=${page}` : "?page=1";
  const res = await fetch(`https://gorest.co.in/public/v2/users${pageParam}&per_page=20`);
  const users = await res.json();
  const headers = res.headers;

  return {
    users,
    page: parseInt(headers.get("x-pagination-page") || ""),
    per_page: parseInt(headers.get("x-pagination-limit") || ""),
    total: parseInt(headers.get("x-pagination-total") || ""),
  };
};

export const getTodos = async (page?: number): Promise<GetTodosResponse> => {
  const pageParam = page ? `?page=${page}` : "?page=1";
  const res = await fetch(`https://gorest.co.in/public/v2/todos${pageParam}&per_page=20`);
  const todos = await res.json();
  const headers = res.headers;

  return {
    todos,
    page: parseInt(headers.get("x-pagination-page") || ""),
    per_page: parseInt(headers.get("x-pagination-limit") || ""),
    total: parseInt(headers.get("x-pagination-total") || ""),
  };
};

export const getPosts = async (page?: number): Promise<GetPostsResponse> => {
  const pageParam = page ? `?page=${page}` : "?page=1";
  const res = await fetch(`https://gorest.co.in/public/v2/posts${pageParam}&per_page=20`);
  const posts = await res.json();
  const headers = res.headers;

  return {
    posts,
    page: parseInt(headers.get("x-pagination-page") || ""),
    per_page: parseInt(headers.get("x-pagination-limit") || ""),
    total: parseInt(headers.get("x-pagination-total") || ""),
  };
};

export const getComments = async (page?: number): Promise<GetCommentsResponse> => {
  const pageParam = page ? `?page=${page}` : "?page=1";
  const res = await fetch(`https://gorest.co.in/public/v2/comments${pageParam}&per_page=20`);
  const comments = await res.json();
  const headers = res.headers;

  return {
    comments,
    page: parseInt(headers.get("x-pagination-page") || ""),
    per_page: parseInt(headers.get("x-pagination-limit") || ""),
    total: parseInt(headers.get("x-pagination-total") || ""),
  };
};
