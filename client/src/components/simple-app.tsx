export default function SimpleApp() {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <img 
              src="/attached_assets/1000119055-removebg-preview.png" 
              alt="GIL Logo" 
              className="h-24 mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              GIL Diamond Certificate Verification
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Professional Diamond Authentication & Gemological Services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Verify Certificate</h2>
              <p className="text-gray-700 mb-4">
                Enter your diamond certificate number to verify authenticity and view detailed grading information.
              </p>
              <input 
                type="text" 
                placeholder="Enter certificate number" 
                className="w-full p-3 border rounded-lg mb-4"
              />
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                Verify Certificate
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Diamond Certificate Verification
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Gemstone Authentication
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Professional Grading Services
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Gem Encyclopedia Access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}