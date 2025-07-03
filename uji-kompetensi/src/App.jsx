import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "belajar php", status: "belum" },
    { id: 2, title: "kerjakan tugas UX", status: "selesai" },
  ]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Handler tambah tugas baru
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input,
        status: "belum",
      },
    ]);
    setInput("");
  };

  // Handler toggle status tugas
  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "selesai" ? "belum" : "selesai",
            }
          : task
      )
    );
  };

  // Handler hapus tugas
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handler buka modal edit
  const handleEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.title);
  };

  // Handler simpan edit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, title: editValue } : task
      )
    );
    setEditId(null);
    setEditValue("");
  };

  // Handler tutup modal
  const handleCloseModal = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Heading To Do List */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700">To-Do List</h1>
      {/* Form input tugas baru */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Tambah tugas baru..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </form>
      {/* List tugas */}
      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === "selesai"}
                onChange={() => handleToggle(task.id)}
                className="w-5 h-5 accent-green-600"
              />
              <span
                className={`font-medium ${
                  task.status === "selesai" ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  task.status === "selesai"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
              {/* Button edit */}
              <button
                onClick={() => handleEdit(task)}
                className="ml-2 text-blue-500 hover:text-blue-700 transition"
                aria-label="Edit"
              >
                <FiEdit2 size={18} />
              </button>
              {/* Button delete */}
              <button
                onClick={() => handleDelete(task.id)}
                className="ml-2 text-red-500 hover:text-red-700 transition"
                aria-label="Hapus"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal edit */}
      {editId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Edit Tugas</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
