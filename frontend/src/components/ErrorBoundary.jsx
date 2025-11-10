import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Home, AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorPage() {
  const error = useRouteError();
  console.error("Error details:", error);
  
  // Extract error message safely
  const errorMessage = error 
    ? (error.statusText || error.message || "An unexpected error occurred")
    : "An unexpected error occurred";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 bg-red-100 p-6 inline-block rounded-full">
          <AlertCircle className="h-16 w-16 text-red-600" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h2>
        
        <p className="text-gray-600 mb-2">
          {errorMessage}
        </p>
        
        {error && error.status && (
          <p className="text-red-500 mb-8">Error {error.status}</p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Home size={18} />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Class component to use as ErrorBoundary for non-route errors
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Create a simplified version of the error page for non-route errors
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-8 bg-red-100 p-6 inline-block rounded-full">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Something Went Wrong
            </h2>
            
            <p className="text-gray-600 mb-2">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Home size={18} />
                <span>Go Home</span>
              </Link>
              
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
              >
                <RefreshCw size={18} />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}