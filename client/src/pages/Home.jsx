import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10">

        {/* LEFT TEXT */}
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">
            Financial Infrastructure for African SMEs
          </h1>

          <p className="text-gray-600">
            Convert daily spare cash into structured digital savings.
            Build financial discipline through voucher-based systems
            designed for real-world SME operations.
          </p>
        </div>

        {/* CARDS SECTION */}
        <div className="flex flex-col gap-6">

          <div className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
            <h2 className="text-xl font-bold mb-2">
              Structured Financing
            </h2>

            <p className="text-gray-600 text-sm">
              Enable SMEs access structured financial flows that help
              manage cash, savings, and future capital needs in a disciplined way.
            </p>
          </div>

          <div className="p-6 border rounded shadow-md w-72">
            <h2 className="text-xl font-bold mb-2">
              Simplified Savings
            </h2>

            <p className="text-gray-600 text-sm">
              Turn small daily cash accumulation into a structured savings system
              using digital vouchers and automated tracking.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;