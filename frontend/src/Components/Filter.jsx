import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { createTask } from "../utils/api";
function Filter() {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    email: "",
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function create() {
    const cronExpression = `${taskData.minute} ${taskData.hour} ${taskData.dayOfMonth} ${taskData.month} ${taskData.dayOfWeek}`;
    const newTask = {
      name: taskData.name,
      schedule: cronExpression,
      email: taskData.email,
      message: "This is Auto generated message",
      expiration: "",
    };
    const res = await createTask(newTask);
    if (res.ok) {
      setTaskData({
        name: "",
        email: "",
        minute: "*",
        hour: "*",
        dayOfMonth: "*",
        month: "*",
        dayOfWeek: "*",
      });
      setShowForm(false);
    }
  }
  return (
    <div className="flex flex-col items-center">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white w-full shadow-lg">
        {/* Search Input */}
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-80 p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm transition">
            <IoFilterSharp className="text-lg" />
            Filter
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition"
          >
            + Create
          </button>
          <button className="flex items-center gap-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm transition">
            <FaCloudDownloadAlt className="text-lg" />
            Export
          </button>
        </div>
      </div>
      {/* Form Section */}
      {showForm && (
        <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 text-gray-800 w-full mt-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700">Create Task</h3>
          {/* Input Fields */}
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Task Name",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Notification Email",
            },
            {
              label: "Minute (0-59)",
              name: "minute",
              type: "text",
              placeholder: "*",
            },
            {
              label: "Hour (0-23)",
              name: "hour",
              type: "text",
              placeholder: "*",
            },
            {
              label: "Day of Month (1-31)",
              name: "dayOfMonth",
              type: "text",
              placeholder: "*",
            },
            {
              label: "Month (1-12)",
              name: "month",
              type: "text",
              placeholder: "*",
            },
            {
              label: "Day of Week (0-6, Sun-Sat)",
              name: "dayOfWeek",
              type: "text",
              placeholder: "*",
            },
          ].map(({ label, name, type, placeholder }) => (
            <label key={name} className="flex flex-col w-full md:w-96 gap-1">
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={taskData[name]}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </label>
          ))}
          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={create}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-400 transition"
            >
              Close X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Filter;
