function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">
          GIL - Gemological Institute
        </h1>
        <p className="text-gray-600 mb-6">
          Professional Diamond & Gemstone Certification
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-amber-100 rounded">
            <h3 className="font-semibold text-amber-800">Certificate Verification</h3>
            <p className="text-sm text-gray-600">Secure authentication system</p>
          </div>
          <div className="p-4 bg-orange-100 rounded">
            <h3 className="font-semibold text-orange-800">Fast Loading</h3>
            <p className="text-sm text-gray-600">Optimized for maximum performance</p>
          </div>
          <div className="p-4 bg-green-100 rounded">
            <h3 className="font-semibold text-green-800">Database Optimized</h3>
            <p className="text-sm text-gray-600">Advanced caching and indexing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
