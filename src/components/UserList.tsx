"use server";

import { GetUsersResponse } from "@/lib/gorestapi";
import Link from "next/link";

export interface UserListProps {
  data: GetUsersResponse;
}

const UserList = ({ data }: UserListProps) => {
  return (
    <div>
      <div>
        <h2>UserList</h2>
      </div>
      <div>
        page: {data.page}, per_page: {data.per_page}, total: {data.total}{" "}
        {data.page && <Link href={`/users?page=${data.page + 1}`}>next</Link>} &nbsp;<Link href={"/"}>home</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>gender</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
