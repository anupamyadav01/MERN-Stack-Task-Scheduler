import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { getTasks, updateTask, deleteTask } from "../utils/api";
function Table() {
  const [data, setData] = useState([]);
  async function fetchData() {
    try {
      const res = await getTasks();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteData(id) {
    try {
      await deleteTask(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  async function editData(id) {
    try {
      await updateTask(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full overflow-x-auto flex justify-center bg-gray-50 py-6 rounded-lg shadow-md">
      <table className="w-full md:w-11/12 border-collapse table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white text-sm uppercase">
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Schedule</th>
            <th className="px-4 py-2">Success Count</th>
            <th className="px-4 py-2">Error Count</th>
            <th className="px-4 py-2">Last Success</th>
            <th className="px-4 py-2">Last Error</th>
            <th className="px-4 py-2">Disabled</th>
            <th className="px-4 py-2">Retries</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Next</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 text-gray-700 transition"
              >
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-400 rounded"
                  />
                </td>
                <td className="border px-4 py-2 text-center">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.schedule}</td>
                <td className="border px-4 py-2 text-center">
                  {item.successCount}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.errorCount}
                </td>
                <td className="border px-4 py-2">{item.lastSuccess}</td>
                <td className="border px-4 py-2">{item.lastError}</td>
                <td className="border px-4 py-2 text-center">
                  {item.disabled ? (
                    <span className="text-red-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-green-500 font-semibold">No</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">{item.retries}</td>
                <td className="border px-4 py-2 text-center">
                  {item.status ? (
                    <TiTick className="text-green-500 text-xl" />
                  ) : (
                    <ImCross className="text-red-500 text-sm" />
                  )}
                </td>
                <td className="border px-4 py-2">{item.next}</td>
                <td className="border px-4 py-2 text-center">
                  <select
                    className="border rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={(e) => {
                      if (e.target.value === "edit") editData(item.id);
                      else if (e.target.value === "delete") deleteData(item.id);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="13"
                className="border px-4 py-6 text-center text-gray-600 italic"
              >
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
