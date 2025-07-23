import type { Todos } from "../habits/types";
import { useTodos } from "./Usetodo";
import { useCreatetodo } from "./Createtodo";
import { Updatetodo } from "./Updatetodo";
import { Deletetodo } from "./Deletetodo";
import { useState } from "react";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();
  const { mutate: addTodo, isPending: addLoading } = useCreatetodo();
  const { mutate: updateTodo } = Updatetodo();
  const { mutate: deleteTodo, isPending: deleteLoading } = Deletetodo();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;
    console.log("Adding Todo:", newTitle);
    addTodo({ title: newTitle, description: newDescription.trim() || undefined });
    setNewTitle("");
    setNewDescription("");
  };
  const activeTodos = todos?.filter((todo: Todos) => !todo.done);
  const completedTodos = todos?.filter((todo : Todos) => todo.done);

  if (isLoading) return <p>Loading Todo List...</p>;
  if (error) return <p>Error loading.</p>;

  return (
    <div className="max-w-screen-md container mx-auto px-4 font-sans text-gray-800 leading-relaxed">
      <h2 className="text-xl font-bold mb-4">Todos</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add a description (optional)"
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={addLoading}>
          {addLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {todos?.length === 0 && (
        <p className="text-gray-500 italic text-base leading-snug">No todos yet. Add your first todo!</p>
      )}

      <ul className="space-y-4">
        {activeTodos?.map((todo: Todos) => (
          <li key={todo.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => updateTodo({ id: todo.id, done: !todo.done })}
                className="mr-2"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                {todo.description && <p className="text-gray-600">{todo.description}</p>}
              </div>
              <button
                onClick={() => deleteTodo({id: todo.id})}
                disabled={deleteLoading}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                  {deleteLoading ? "Deleting..." : "Delete"}
              </button>
              <button 
              onClick = {() => {
                const updatedTitle = prompt("Update todo title:", todo.title);
                const updatedDescription = prompt("Update todo description:", todo.description || "");
                if (updatedTitle !== null && updatedTitle.trim() !== "") {
                  updateTodo({
                    id: todo.id,
                    title: updatedTitle.trim(),
                    description: updatedDescription?.trim() || todo.description,
                  });
              }
            }
            }
              > Update  
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Completed Todos</h3>
      {completedTodos?.length === 0 && (
        <p className="text-gray-500 italic text-base leading-snug">No completed todos yet.</p>
      )}
      <ul className="space-y-2 mt-2">
        {completedTodos?.map((todo : Todos) => (
          <li key={todo.id} className="text-green-700"> {todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
