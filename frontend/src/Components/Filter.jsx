import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { createTask } from "../utils/api";

function Filter() {
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
      message: taskData.message,
      expiration: "",
    };
    const res = await createTask(newTask);
    if (res) {
      setTaskData({
        name: "",
        email: "",
        message: "",
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
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-80 p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
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

      {/* Modal */}
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
              Create Task
            </h3>

            {/* Grid Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* First Column */}
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

              {/* Second Column */}
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

              {/* Third Column */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Example Cron Rules
                </h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>*/15 * * * *</strong> - Runs every 15 minutes
                  </li>
                  <li>
                    <strong>* * * * *</strong> - Runs every minute
                  </li>
                  <li>
                    <strong>0 17 * * 0</strong> - Runs at 5:00 PM every Sunday
                  </li>
                  <li>
                    <strong>30 10 * * *</strong> - Runs at 10:30 AM daily
                  </li>
                </ul>
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
                onClick={create}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
