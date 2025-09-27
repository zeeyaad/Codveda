import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Welcome to My Full-Stack App</h1>
      <p className="mt-4">Explore Users and Products managed with our API.</p>
      
      <div className="mt-6 space-x-4">
        <Link to="/users" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Users
        </Link>
        <Link to="/products" className="px-4 py-2 bg-green-600 text-white rounded">
          Go to Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
