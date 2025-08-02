import type { Todos } from "../habits/types";
import { useTodos } from "./Usetodo";
import { useCreatetodo } from "./Createtodo";
import { Updatetodo } from "./Updatetodo";
import { Deletetodo } from "./Deletetodo";
import { useState } from "react";
import { FiEdit, FiTrash, FiCheckCircle } from "react-icons/fi";


export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();
  const { mutate: addTodo, isPending: addLoading } = useCreatetodo();
  const { mutate: updateTodo, isPending: updateLoading } = Updatetodo();
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

  const list: Todos[] = Array.isArray(todos) ? (todos as Todos[]) : [];
if (!Array.isArray(todos) && todos !== undefined) {
  console.error("Expected todos array; got:", todos);
}

const activeTodos = list.filter(t => !t.done);
const completedTodos = list.filter(t => t.done);

if (isLoading) {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-200 dark:bg-zinc-700 rounded-md animate-pulse"
        />
      ))}
    </div>
  );
}
  if (error) return <p>Error loading.</p>;

  return (
    // <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm flex items-center justify-between">
       // <div className="backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-2xl border border-white/40 p-4 shadow-sm flex items-center justify-between">

   <div className="max-w-screen-md container mx-auto px-4 font-sans text-black-800 leading-relaxed"> 

      <h2 className="text-xl font-bold mb-4">Todos</h2>

      <form onSubmit={handleAdd} 
  className="mb-4 backdrop-blur-md bg-white/50 dark:bg-white/10 rounded-2xl border border-white/40 shadow-sm p-4 space-y-3">
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
        <button type="submit" className="bg-blue-500 text-black px-3 py-1 rounded" disabled={addLoading}>
          {addLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {list?.length === 0 && (
        <p className="text-black-500 italic text-base leading-snug">No todos yet. Add your first todo!</p>
      )}

      <ul className="space-y-4">
        {activeTodos?.map((todo: Todos) => (
<li
  key={todo.id}
  className="backdrop-blur-md bg-white/50 dark:bg-white/10 rounded-2xl border border-white/40 p-4 shadow-sm flex justify-between items-center"
>
  <div className="flex flex-col">
    <h3 className="text-lg font-semibold">{todo.title}</h3>
    {todo.description && (
      <p className="text-black-600 text-sm">{todo.description}</p>
    )}
  </div>

  <div className="flex items-center gap-2">
    <button
      onClick={() => updateTodo({ id: todo.id, done: !todo.done })}
      disabled={updateLoading}
      className="p-2 text-green-500 hover:text-black hover:bg-green-500 rounded-full transition-all"
      title={todo.done ? "Mark as Incomplete" : "Mark as Complete"}
    >
      <FiCheckCircle size={18} />
    </button>

    <button
      onClick={() => deleteTodo({ id: todo.id })}
      disabled={deleteLoading}
      className="p-2 text-red-500 hover:text-black hover:bg-red-500 rounded-full transition-all"
      title="Delete"
    >
      <FiTrash size={18} />
    </button>

    <button
      onClick={() => {
        const updatedTitle = prompt("Update todo title:", todo.title);
        const updatedDescription = prompt("Update todo description:", todo.description || "");
        if (updatedTitle !== null && updatedTitle.trim() !== "") {
          updateTodo({
            id: todo.id,
            title: updatedTitle.trim(),
            description: updatedDescription?.trim() || todo.description,
          });
        }
      }}
      className="p-2 text-blue-500 hover:text-black hover:bg-blue-500 rounded-full transition-all"
      title="Update"
    >
      <FiEdit size={18} />
    </button>
  </div>
</li>

        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Completed Todos</h3>
      {completedTodos?.length === 0 && (
        <p className="text-black-500 italic text-base leading-snug">No completed todos yet.</p>
      )}
      <ul className="space-y-2 mt-2">
        {completedTodos?.map((todo : Todos) => (
          <li key={todo.id} className="text-green-700"> {todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
