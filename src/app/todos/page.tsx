"use server";
import TodoList from "@/components/TodoList";

export default async function TodosListPage() {
  console.log("TodosListPage Rendering");
  return <TodoList />;
}
