
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Mail, Phone, Building, MapPin } from 'lucide-react';

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

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getQualityLabel = (score: number) => {
    if (score >= 0.8) return 'High Quality';
    if (score >= 0.6) return 'Medium Quality';
    return 'Low Quality';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{lead.name}</CardTitle>
          <div className="flex items-center gap-2">
            {lead.accepted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <Badge variant={lead.accepted ? "default" : "destructive"}>
              {lead.accepted ? 'Accepted' : 'Rejected'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{lead.email}</span>
        </div>
        
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{lead.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>{lead.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{lead.location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getQualityColor(lead.quality_score)}`}></div>
            <span className="text-sm font-medium">{getQualityLabel(lead.quality_score)}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{Math.round(lead.quality_score * 100)}%</div>
            <div className="text-xs text-muted-foreground">
              {Math.round(lead.prediction_confidence * 100)}% confident
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getQualityColor(lead.quality_score)}`}
            style={{ width: `${lead.quality_score * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
