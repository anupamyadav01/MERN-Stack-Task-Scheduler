import { createContext, useState } from "react";
import Filter from "./Components/Filter";
import Navbar from "./Components/Navbar";
import Table from "./Components/Table";

export const TasksDataContext = createContext([[], () => {}]);

function App() {
  const [searchData, setSearchData] = useState([]);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>
      {/* Main Content */}
      <section aria-label="Main Content" className="w-full">
        <TasksDataContext.Provider value={[searchData, setSearchData]}>
          <Filter />
          <Table />
        </TasksDataContext.Provider>
      </section>
      <div className="flex-grow text-xl text-red-500 text-center">
        <p>
          Filter and History functionality are in progress. <br /> It will be
          available soon.
        </p>
      </div>
      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white py-4 text-center text-sm">
        <p>© {currentYear} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
