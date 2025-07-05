// src/components/PredictionResult.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Brain, RotateCcw, TrendingUp } from 'lucide-react';

// IMPORTANT: Ensure there is NO import for LeadInputForm here.
// PredictionResult does not directly use LeadInputForm.

// Interface for the LeadResponse. Ensure this matches your backend's successful response structure.
interface LeadResponse {
  lead: {
    id: string;
    name: string;
    email: string;
    phone?: string; // Optional property
    company: string;
    location: string;
    quality_score: number;
    accepted: boolean;
    prediction_confidence: number;
  };
  quality_score: number;
  accepted: boolean;
  prediction_confidence: number;
  features_used: string[];
}

interface PredictionResultProps {
  result: LeadResponse; // Expecting a LeadResponse object
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ result, onReset }) => {
  // --- Safeguard: Ensure numeric values for calculations ---
  // Use Number() to explicitly convert to a number, and use || 0 to provide a fallback if NaN results.
  const displayQualityScore = Number(result?.quality_score) || 0;
  const displayPredictionConfidence = Number(result?.prediction_confidence) || 0;

  // Helper function to determine quality color based on score
  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper function to determine quality label based on score
  const getQualityLabel = (score: number) => {
    if (score >= 0.8) return 'High Quality';
    if (score >= 0.6) return 'Medium Quality';
    return 'Low Quality';
  };

  // Safely access features_used, defaulting to an empty array if null/undefined
  const features = result?.features_used || [];

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      {/* Main Result Card */}
      <Card className="border-l-4 border-l-blue-500 rounded-lg shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <Brain className="h-5 w-5 text-blue-500" />
              ML Prediction Result
            </CardTitle>
            <div className="flex items-center gap-2">
              {result?.accepted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <Badge variant={result?.accepted ? "default" : "destructive"} className="px-3 py-1 text-sm rounded-full">
                {result?.accepted ? 'Lead Accepted' : 'Lead Rejected'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(displayQualityScore * 100)}%
              </div>
              <div className="text-sm text-gray-600">Quality Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(displayPredictionConfidence * 100)}%
              </div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getQualityColor(displayQualityScore)}`}></div>
                <div className="text-sm font-medium text-gray-700">{getQualityLabel(displayQualityScore)}</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getQualityColor(displayQualityScore)}`}
              style={{ width: `${displayQualityScore * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-center pt-4 border-t border-gray-200 mt-4">
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <RotateCcw className="h-4 w-4" />
              Analyze Another Lead
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="rounded-lg shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="prose prose-sm max-w-none text-gray-700">
            <p>
              Based on the ML model analysis, this lead has been classified as{' '}
              <strong className={result?.accepted ? 'text-green-600' : 'text-red-600'}>
                {result?.accepted ? 'high-potential' : 'low-potential'}
              </strong>{' '}
              with a quality score of {Math.round(displayQualityScore * 100)}%.
            </p>
            <p className="mt-2">
              The model has {Math.round(displayPredictionConfidence * 100)}% confidence in this prediction, 
              based on key features including {features.slice(0, 3).join(', ')}
              {features.length > 3 && ` and ${features.length - 3} other factors`}.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
