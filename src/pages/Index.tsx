// src/pages/Index.tsx
import React from 'react';
import { useLeadData } from '../hooks/useLeadData'; // Adjust path relative to pages/
import { LeadInputForm } from '../components/LeadInputForm'; // Adjust path relative to pages/
import { PredictionResult } from '../components/PredictionResult'; // Adjust path relative to pages/

// The main page component that will be rendered at the "/" route
export default function Index() {
  // Use the custom hook to manage lead data state and actions
  const { result, loading, error, predictLead, clearResult } = useLeadData();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Loading Indicator */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-lg text-gray-700">Analyzing lead data...</p>
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg onClick={() => clearResult()} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span> 
        </div>
      )}

      {/* Conditional Rendering: Show Form or Result */}
      {
        // If not loading, no result, and no error, show the input form
        !loading && !result && !error && (
          <LeadInputForm onSubmit={predictLead} loading={loading} />
        )
      }

      {
        // If not loading and a result is available, show the prediction result
        !loading && result && (
          <PredictionResult result={result} onReset={clearResult} />
        )
      }
    </div>
  );
}
