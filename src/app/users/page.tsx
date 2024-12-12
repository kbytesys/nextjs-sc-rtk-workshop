"use server";

import { getUsers } from "@/lib/gorestapi";
import UserList from "@/components/UserList";

export default async function UsersListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log("UsersListPage Rendering");
  const { page } = await searchParams;
  const users = await getUsers(page ? parseInt(page as string) : 1);

  return <UserList data={users} />;
}
