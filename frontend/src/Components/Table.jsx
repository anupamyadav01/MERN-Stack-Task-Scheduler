import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { getTasks, updateTask, deleteTask } from "../utils/api";

function Table() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    email: "",
    message: "",
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Fetch tasks from the backend
  async function fetchData() {
    try {
      const res = await getTasks();
      setData(res?.data); // Update state with the fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Delete a task
  async function deleteData(id) {
    try {
      await deleteTask(id);
      fetchData(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Edit a task (opens the form with data pre-filled)
  async function editData(id) {
    const task = data.find((item) => item._id === id);
    if (task) {
      setTaskData({
        name: task.name,
        email: task.email,
        message: task.message,
        minute: task.schedule.split(" ")[0],
        hour: task.schedule.split(" ")[1],
        dayOfMonth: task.schedule.split(" ")[2],
        month: task.schedule.split(" ")[3],
        dayOfWeek: task.schedule.split(" ")[4],
      });
      setCurrentTaskId(id);
      setIsEdit(true);
      setShowForm(true);
    }
  }

  // Update the task
  async function update() {
    try {
      const updatedTask = {
        name: taskData.name,
        schedule: `${taskData.minute} ${taskData.hour} ${taskData.dayOfMonth} ${taskData.month} ${taskData.dayOfWeek}`,
        email: taskData.email,
        message: taskData.message,
      };
      await updateTask(currentTaskId, updatedTask);
      fetchData(); // Refresh tasks after update
      setShowForm(false);
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full overflow-x-auto flex justify-center bg-gray-50 py-6 rounded-lg shadow-md">
      <table className="w-full md:w-11/12 border-collapse table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white text-sm uppercase">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Schedule</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Completed</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 text-gray-700 transition"
              >
                <td className="border px-4 py-5">{item.name}</td>
                <td className="border px-4 py-5">{item.schedule}</td>
                <td className="border px-4 py-5">{item.email}</td>
                <td className="border px-4 py-5">{item.message}</td>
                <td className="border px-4 py-5 text-center">
                  {item.isCompleted ? (
                    <TiTick className="text-green-500 text-xl" />
                  ) : (
                    <ImCross className="text-red-500 text-sm" />
                  )}
                </td>
                <td className="border px-4 py-1 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => editData(item._id)}
                      className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-400 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteData(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-400 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="border px-4 py-6 text-center text-gray-600 italic"
              >
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Form Modal */}
      {showForm && (
        <div className="my-5 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              {isEdit ? "Edit Task" : "Create Task"}
            </h3>

            {/* Grid Layout */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                {["name", "email", "message"].map((field) => (
                  <label key={field} className="flex flex-col gap-1 mb-4">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {field}
                    </span>
                    <input
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={taskData[field]}
                      onChange={handleInputChange}
                      className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </label>
                ))}
              </div>
              <div>
                {[
                  { name: "minute", placeholder: "*/15" },
                  { name: "hour", placeholder: "0-23" },
                  { name: "dayOfMonth", placeholder: "1-31" },
                  { name: "month", placeholder: "1-12" },
                  { name: "dayOfWeek", placeholder: "0-6" },
                ].map(({ name, placeholder }) => (
                  <label key={name} className="flex flex-col gap-1 mb-4">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {name}
                    </span>
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={taskData[name]}
                      onChange={handleInputChange}
                      className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={isEdit ? update : "create"}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition"
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
