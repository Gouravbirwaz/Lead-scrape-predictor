// src/useLeadData.ts
import { useState } from 'react';
import { toast } from '@/hooks/use-toast'; // Assuming this toast hook is available

// Interface for the Lead object within the LeadResponse
interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  location: string;
  quality_score: number;
  accepted: boolean;
  prediction_confidence: number;
}

// Interface for the form data structure as received from LeadInputForm
interface LeadFormData {
  'Lead Origin': string;
  'Lead Source': string;
  'Do Not Email': string; // "Yes"/"No"
  'Do Not Call': string; // "Yes"/"No"
  'Converted': number; // 0/1
  'TotalVisits': number;
  'Total Time Spent on Website': number;
  'Page Views Per Visit': number;
  'Last Activity': string;
  'Country': string;
  'Specialization': string;
  'How did you hear about X Education': string;
  'What is your current occupation': string;
  'What matters most to you in choosing a course': string;
  'Search': string; // "Yes"/"No"
  'Magazine': string; // "Yes"/"No"
  'Newspaper Article': string; // "Yes"/"No"
  'X Education Forums': string; // "Yes"/"No"
  'Newspaper': string; // "Yes"/"No"
  'Digital Advertisement': string; // "Yes"/"No"
  'Through Recommendations': string; // "Yes"/"No"
  'Receive More Updates About Our Courses': string; // "Yes"/"No"
  'Tags': string;
  'Lead Quality': string;
  'Update me on Supply Chain Content': string; // "Yes"/"No"
  'Get updates on DM Content': string; // "Yes"/"No"
  'Lead Profile': string;
  'City': string;
  'Asymmetrique Activity Index': string; // "02.Medium"
  'Asymmetrique Profile Index': string; // "02.Medium"
  'Asymmetrique Activity Score': number;
  'Asymmetrique Profile Score': number;
  'I agree to pay the amount through cheque': string; // "Yes"/"No"
  'A free copy of Mastering The Interview': string; // "Yes"/"No"
  'Last Notable Activity': string;
}

// Interface for the full LeadResponse from the prediction API
// Note: Your backend's /predict endpoint currently returns only {"prediction": label}.
// To match the frontend's PredictionResultProps, the backend would need to return
// quality_score, accepted, prediction_confidence, and features_used.
// For now, I'll adapt the frontend's LeadResponse to what the backend *currently* sends,
// and then generate mock values for the other fields on the frontend.
// If you want the backend to provide all fields, you'll need to modify main.py's /predict endpoint.
interface LeadResponse {
  prediction: string; // The predicted label from your backend ('High', 'Medium', 'Low')
  // The following fields are NOT currently returned by your backend's /predict endpoint.
  // They would need to be calculated/determined by your backend and returned for full accuracy.
  // For now, we'll generate mock values for these on the frontend if the backend doesn't provide them.
  quality_score: number;
  accepted: boolean;
  prediction_confidence: number;
  features_used: string[];
}


export const useLeadData = () => {
  const [result, setResult] = useState<LeadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === IMPORTANT: This is the URL for YOUR FastAPI backend ===
  // Ensure your FastAPI app is running on this address (e.g., using `uvicorn main:app --reload`)
  const backendApiUrl = 'http://127.0.0.1:8000'; 

  const predictLead = async (leadData: LeadFormData) => {
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous result

    try {
      // The data structure expected by your FastAPI /predict endpoint
      const requestPayload = {
        data: leadData // Your FastAPI expects the form data inside a 'data' key
      };

      console.log(`Sending lead data to: ${backendApiUrl}/predict`);
      console.log('Request Payload:', requestPayload);
      
      const response = await fetch(`${backendApiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        // Attempt to read error message from backend if available
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const backendResponse = await response.json();
      console.log('Received prediction from backend:', backendResponse);

      // === Adapt backend response to frontend's LeadResponse interface ===
      // Your backend currently returns only {'prediction': label}.
      // We need to generate mock values for quality_score, accepted, and prediction_confidence
      // to match the PredictionResult component's expectations.
      // Ideally, your backend would calculate and return these.
      const predictedLabel = backendResponse.prediction;
      
      let qualityScore: number;
      let accepted: boolean;
      let predictionConfidence: number = Math.random() * 0.2 + 0.8; // Mock confidence 80-100%

      // Logic to derive quality_score and accepted from the predictedLabel
      if (predictedLabel === 'High') {
        qualityScore = Math.random() * 0.2 + 0.8; // 0.8 to 1.0
        accepted = true;
      } else if (predictedLabel === 'Medium') {
        qualityScore = Math.random() * 0.2 + 0.6; // 0.6 to 0.8
        accepted = true; // Or false, depending on your business logic for 'Medium'
      } else { // 'Low' or 'Not Specified' etc.
        qualityScore = Math.random() * 0.6; // 0.0 to 0.6
        accepted = false;
      }

      const processedResult: LeadResponse = {
        prediction: predictedLabel,
        quality_score: qualityScore,
        accepted: accepted,
        prediction_confidence: predictionConfidence,
        features_used: Object.keys(leadData).slice(0, 4) // Mock some features used
      };

      setResult(processedResult);

      toast({
        title: "Prediction Complete!",
        description: `Lead quality: ${predictedLabel} (Score: ${Math.round(processedResult.quality_score * 100)}%)`,
      });

    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get prediction';
      console.error('Error predicting lead:', err);
      setError(errorMessage);
      
      toast({
        title: "Connection Error or Prediction Failed",
        description: `Failed to connect to backend or prediction failed: ${errorMessage}. Displaying mock data.`,
        variant: "destructive"
      });

      // Generate mock prediction for demonstration if API call fails
      const mockPrediction: LeadResponse = {
        prediction: Math.random() > 0.5 ? 'High' : 'Low',
        quality_score: Math.random() * 0.4 + 0.6, // Random score between 0.6 and 1.0
        accepted: Math.random() > 0.3, // Randomly accepted or rejected
        prediction_confidence: Math.random() * 0.2 + 0.8, // Random confidence between 0.8 and 1.0
        features_used: ['TotalVisits', 'Asymmetrique Activity Score', 'Specialization', 'Country']
      };
      setResult(mockPrediction); // Set mock result
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    result,
    loading,
    error,
    predictLead,
    clearResult
  };
};
