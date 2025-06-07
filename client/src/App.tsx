import { Switch, Route } from "wouter";
import AdminMinimal from "@/pages/admin-minimal";

// Simple loading component without complex dependencies
function SimpleLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/admin" component={AdminMinimal} />
      <Route component={() => (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">GIL - Gemological Institute</h1>
            <p className="text-gray-600 mb-6">Gemological certificate system</p>
            <a href="/admin" className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800">
              Admin Dashboard
            </a>
          </div>
        </div>
      )} />
    </Switch>
  );
}

export default App;
