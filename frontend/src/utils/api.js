import axios from "axios";
const API_URL = "http://localhost:10000/api/tasks/";
export const createTask = async (task) => {
  try {
    console.log(task);
    const response = await axios.post(`${API_URL}createTask`, task);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}getAllTasks`);
    console.log("Fetched all tasks successfully:", { response: response.data });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", { error: error.message });
    throw error;
  }
};
export const updateTask = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}editTask`, updates);
    console.log(`Task ${id} updated successfully:`, {
      updates,
      response: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, {
      updates,
      error: error.message,
    });
    throw error;
  }
};
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}deleteTask`, {
      data: { id },
    });
    console.log(`Task ${id} deleted successfully:`, {
      response: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, { error: error.message });
    throw error;
  }
};
