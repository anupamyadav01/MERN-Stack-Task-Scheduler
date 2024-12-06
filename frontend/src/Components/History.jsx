import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { getTasks, deleteTask } from "../utils/api";

function History() {
  const [completedTasks, setCompletedTasks] = useState([]); // Holds only completed tasks

  // Fetch tasks and filter completed ones
  async function fetchCompletedTasks() {
    try {
      const res = await getTasks();
      const tasks = res?.data || [];
      const completed = tasks.filter((task) => task.isCompleted); // Filter completed tasks
      setCompletedTasks(completed);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Delete a task by ID
  async function deleteCompletedTask(id) {
    try {
      await deleteTask(id);
      fetchCompletedTasks(); // Refresh completed tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Fetch tasks on component mount
  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="w-full overflow-x-auto flex justify-center bg-gray-50 py-6 rounded-lg shadow-md">
      <table className="w-full md:w-11/12 border-collapse table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white text-sm uppercase">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Schedule</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-100 text-gray-700 transition"
              >
                <td className="border px-4 py-2">{task.name}</td>
                <td className="border px-4 py-2">{task.schedule}</td>
                <td className="border px-4 py-2">{task.email}</td>
                <td className="border px-4 py-2">{task.message}</td>
                <td className="border px-4 py-2 text-center">
                  <TiTick className="text-green-500 text-xl" />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => deleteCompletedTask(task._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-400 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border px-4 py-6 text-center text-gray-600 italic"
              >
                No Completed Tasks
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default History;
