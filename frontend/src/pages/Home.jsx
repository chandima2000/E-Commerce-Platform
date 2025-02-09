export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      {/* Hero Section */}
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6 animate-fade-in">
          Welcome to <span className="text-yellow-500">E-Store</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
          Discover amazing products and shop with ease. Login to start your journey!
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-5 w-full flex justify-center">
        <img
          src="./home.jpg"
          alt="Store Banner"
          className="w-full md:w-[80%] lg:w-[60%] max-h-96 object-cover rounded-lg shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-blue-600 mb-3">🚀 Fast Delivery</h3>
          <p className="text-gray-600">Get your orders delivered quickly and efficiently.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-blue-600 mb-3">💎 Best Products</h3>
          <p className="text-gray-600">Shop from a wide range of top-quality products.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-blue-600 mb-3">🔒 Secure Payments</h3>
          <p className="text-gray-600">We ensure safe and secure transactions.</p>
        </div>
      </div>

    </div>
  );
}
