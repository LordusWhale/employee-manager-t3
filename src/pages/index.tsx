import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br from-indigo-600 to-indigo-500 absolute top-0 left-0 z-0">
      <h1 className="text-4xl text-white font-bold">
        Welcome to the Employee Manager. Please select a page from the navbar.
      </h1>
    </div>
  );
};

export default Home;
