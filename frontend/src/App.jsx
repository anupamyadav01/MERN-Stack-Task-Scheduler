import Filter from "./Components/Filter";
import Navbar from "./Components/Navbar";
import Table from "./Components/Table";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>
      {/* Main Content */}
      <section className="w-full">
        <Filter />
        <Table />
      </section>
      <div className="flex-grow text-xl text-red-500 text-center">
        Search, Filter and History functionality are in progress. <br /> It will
        be available soon.
      </div>
      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white py-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
