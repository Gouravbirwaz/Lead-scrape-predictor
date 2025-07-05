// src/components/LeadInputForm.tsx
import React, { useState } from 'react';

// Importing UI components from shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Interface for the form data structure
interface LeadFormData {
  'Lead Origin': string;
  'Lead Source': string;
  'Do Not Email': string;
  'Do Not Call': string;
  'Converted': number;
  'TotalVisits': number;
  'Total Time Spent on Website': number;
  'Page Views Per Visit': number;
  'Last Activity': string;
  'Country': string;
  'Specialization': string;
  'How did you hear about X Education': string;
  'What is your current occupation': string;
  'What matters most to you in choosing a course': string;
  'Search': string;
  'Magazine': string;
  'Newspaper Article': string;
  'X Education Forums': string;
  'Newspaper': string;
  'Digital Advertisement': string;
  'Through Recommendations': string;
  'Receive More Updates About Our Courses': string;
  'Tags': string;
  'Lead Quality': string;
  'Update me on Supply Chain Content': string;
  'Get updates on DM Content': string;
  'Lead Profile': string;
  'City': string;
  'Asymmetrique Activity Index': string;
  'Asymmetrique Profile Index': string;
  'Asymmetrique Activity Score': number;
  'Asymmetrique Profile Score': number;
  'I agree to pay the amount through cheque': string;
  'A free copy of Mastering The Interview': string;
  'Last Notable Activity': string;
}

interface LeadInputFormProps {
  onSubmit: (formData: LeadFormData) => void;
  loading: boolean;
}

export const LeadInputForm: React.FC<LeadInputFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    'Lead Origin': '',
    'Lead Source': '',
    'Do Not Email': 'No',
    'Do Not Call': 'No',
    'Converted': 0,
    'TotalVisits': 0,
    'Total Time Spent on Website': 0,
    'Page Views Per Visit': 0,
    'Last Activity': '',
    'Country': '',
    'Specialization': 'Select',
    'How did you hear about X Education': 'Select',
    'What is your current occupation': 'Unemployed',
    'What matters most to you in choosing a course': 'Better Career Prospects',
    'Search': 'No',
    'Magazine': 'No',
    'Newspaper Article': 'No',
    'X Education Forums': 'No',
    'Newspaper': 'No',
    'Digital Advertisement': 'No',
    'Through Recommendations': 'No',
    'Receive More Updates About Our Courses': 'No',
    'Tags': '',
    'Lead Quality': 'Low in Relevance',
    'Update me on Supply Chain Content': 'No',
    'Get updates on DM Content': 'No',
    'Lead Profile': 'Select',
    'City': 'Select',
    'Asymmetrique Activity Index': '02.Medium',
    'Asymmetrique Profile Index': '02.Medium',
    'Asymmetrique Activity Score': 15,
    'Asymmetrique Profile Score': 15,
    'I agree to pay the amount through cheque': 'No',
    'A free copy of Mastering The Interview': 'No',
    'Last Notable Activity': 'Modified'
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    contact: true,
    activity: true,
    location: true,
    education: true,
    survey: true,
    marketing: true,
    analytics: true,
    additional: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Dropdown options (same as before)
  const leadOriginOptions = ['Landing Page Submission', 'API', 'Lead Add Form'];
  const leadSourceOptions = ['Direct Traffic', 'Google', 'Organic Search', 'Referral Sites', 'Olark Chat', 'Social Media', 'Reference', 'WeLearn', 'Press_Release'];
  const leadQualityOptions = ['High', 'Medium', 'Low', 'Low in Relevance', 'Not Specified'];
  const lastActivityOptions = ['Email Opened', 'Unreachable', 'Converted to Lead', 'Email Link Clicked', 'Page Visited on Website', 'Form Submitted on Website', 'Unsubscribed', 'Modified', 'Had a Phone Conversation', 'Email Bounced', 'SMS Sent', 'Olark Chat Conversation', 'Approached upfront', 'Email Received', 'Email Marked Spam', 'Resubscribed to emails', 'View in browser link Clicked'];
  const lastNotableActivityOptions = ['Email Opened', 'Modified', 'Email Link Clicked', 'Unreachable', 'Unsubscribed', 'Page Visited on Website', 'Had a Phone Conversation', 'Email Bounced', 'SMS Sent', 'Olark Chat Conversation', 'Approached upfront', 'Email Received', 'Email Marked Spam', 'Resubscribed to emails', 'View in browser link Clicked'];
  const specializationOptions = ['Select', 'Media and Advertising', 'Banking, Investment And Insurance', 'Travel and Tourism', 'Digital Marketing', 'Business Administration', 'IT Projects Management', 'Finance Management', 'Healthcare Management', 'Hospitality, Travel & Tourism', 'E-COMMERCE', 'Retail Management', 'Rural and Agribusiness', 'Services Excellence', 'International Business', 'Supply Chain Management', 'Human Resource Management', 'Operations Management', 'Not Specified'];
  const howDidYouHearOptions = ['Select', 'Word Of Mouth', 'Student of SomeCollege', 'Other', 'Online Search', 'Email', 'Social Media', 'Referral Sites', 'Google', 'WeLearn', 'Newspaper', 'Digital Advertisement', 'Through Recommendations', 'Magazine', 'Newspaper Article', 'X Education Forums', 'Not Specified'];
  const currentOccupationOptions = ['Unemployed', 'Student', 'Working Professional', 'Housewife', 'Other', 'Not Specified'];
  const whatMattersMostOptions = ['Better Career Prospects', 'Flexibility & Convenience', 'Quality of Education', 'Not Specified'];
  const leadProfileOptions = ['Select', 'Potential Lead', 'Lateral Student', 'Other Leads', 'Not Specified'];
  const cityOptions = ['Select', 'Mumbai', 'Thane & Beyond', 'Other Cities', 'Other Metro Cities', 'Tier II Cities', 'Not Specified'];
  const asymmetriqueIndexOptions = ['01.High', '02.Medium', '03.Low', 'Not Specified'];

  const handleInputChange = (field: keyof LeadFormData, value: any) => {
    let processedValue = value;

    if (typeof value === 'boolean') {
      if (field === 'Converted') {
        processedValue = value ? 1 : 0;
      } else {
        processedValue = value ? 'Yes' : 'No';
      }
    }

    if (['TotalVisits', 'Total Time Spent on Website', 'Page Views Per Visit', 'Asymmetrique Activity Score', 'Asymmetrique Profile Score'].includes(field as string)) {
      processedValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full shadow-xl border border-gray-200 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg border-b border-blue-600">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold tracking-tight">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <UserPlus className="h-5 w-5" />
            </div>
            Lead Conversion Assessment
          </CardTitle>
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white/90 hover:bg-white/20">
            AI-Powered Scoring
          </Badge>
        </div>
        <p className="text-sm text-blue-100 mt-1">
          Complete the form to evaluate lead conversion probability
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('basic')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Basic Information
              </h3>
              {expandedSections.basic ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.basic && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="lead-origin" className="text-sm font-medium text-gray-700">Lead Origin *</Label>
                  <Select value={formData['Lead Origin']} onValueChange={(value) => handleInputChange('Lead Origin', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select lead origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadOriginOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-source" className="text-sm font-medium text-gray-700">Lead Source *</Label>
                  <Select value={formData['Lead Source']} onValueChange={(value) => handleInputChange('Lead Source', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select lead source" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadSourceOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Contact Preferences Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('contact')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Contact Preferences
              </h3>
              {expandedSections.contact ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.contact && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <Checkbox
                    id="do-not-email"
                    checked={formData['Do Not Email'] === 'Yes'}
                    onCheckedChange={(checked) => handleInputChange('Do Not Email', checked)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="do-not-email" className="text-sm font-medium">Do Not Email</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <Checkbox
                    id="do-not-call"
                    checked={formData['Do Not Call'] === 'Yes'}
                    onCheckedChange={(checked) => handleInputChange('Do Not Call', checked)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="do-not-call" className="text-sm font-medium">Do Not Call</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <Checkbox
                    id="converted"
                    checked={formData['Converted'] === 1}
                    onCheckedChange={(checked) => handleInputChange('Converted', checked)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="converted" className="text-sm font-medium">Converted</Label>
                </div>
              </div>
            )}
          </div>

          {/* Activity Metrics Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('activity')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Engagement Metrics
              </h3>
              {expandedSections.activity ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.activity && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="total-visits" className="text-sm font-medium text-gray-700">Total Visits</Label>
                  <Input
                    id="total-visits"
                    type="number"
                    className="mt-1 bg-white"
                    value={formData['TotalVisits']}
                    onChange={(e) => handleInputChange('TotalVisits', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-spent" className="text-sm font-medium text-gray-700">Total Time Spent (minutes)</Label>
                  <Input
                    id="time-spent"
                    type="number"
                    className="mt-1 bg-white"
                    value={formData['Total Time Spent on Website']}
                    onChange={(e) => handleInputChange('Total Time Spent on Website', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page-views" className="text-sm font-medium text-gray-700">Page Views Per Visit</Label>
                  <Input
                    id="page-views"
                    type="number"
                    step="0.01"
                    className="mt-1 bg-white"
                    value={formData['Page Views Per Visit']}
                    onChange={(e) => handleInputChange('Page Views Per Visit', e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('location')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Location Information
              </h3>
              {expandedSections.location ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.location && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                  <Input
                    id="country"
                    className="mt-1 bg-white"
                    value={formData['Country']}
                    onChange={(e) => handleInputChange('Country', e.target.value)}
                    placeholder="Enter Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                  <Select value={formData['City']} onValueChange={(value) => handleInputChange('City', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Education Details Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('education')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Professional Background
              </h3>
              {expandedSections.education ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.education && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">Area of Specialization</Label>
                  <Select value={formData['Specialization']} onValueChange={(value) => handleInputChange('Specialization', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">Current Occupation</Label>
                  <Select value={formData['What is your current occupation']} onValueChange={(value) => handleInputChange('What is your current occupation', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select Occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentOccupationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Survey Questions Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('survey')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Interest & Preferences
              </h3>
              {expandedSections.survey ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.survey && (
              <div className="mt-4 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="hear-about" className="text-sm font-medium text-gray-700">How did you hear about us?</Label>
                  <Select value={formData['How did you hear about X Education']} onValueChange={(value) => handleInputChange('How did you hear about X Education', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {howDidYouHearOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-matters" className="text-sm font-medium text-gray-700">Primary Consideration for Course Selection</Label>
                  <Select value={formData['What matters most to you in choosing a course']} onValueChange={(value) => handleInputChange('What matters most to you in choosing a course', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select consideration" />
                    </SelectTrigger>
                    <SelectContent>
                      {whatMattersMostOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Marketing Channels Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('marketing')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                Marketing Channels
              </h3>
              {expandedSections.marketing ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.marketing && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">Select all marketing channels that contributed to this lead</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Search', 'Magazine', 'Newspaper Article', 'X Education Forums', 'Newspaper', 'Digital Advertisement', 'Through Recommendations'].map((channel) => (
                    <div key={channel} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                      <Checkbox
                        id={channel.toLowerCase().replace(/\s+/g, '-')}
                        checked={formData[channel as keyof LeadFormData] === 'Yes'}
                        onCheckedChange={(checked) => handleInputChange(channel as keyof LeadFormData, checked)}
                        className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor={channel.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">{channel}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Asymmetrique Scores Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('analytics')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Lead Scoring Metrics
              </h3>
              {expandedSections.analytics ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.analytics && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="activity-index" className="text-sm font-medium text-gray-700">Activity Index</Label>
                  <Select value={formData['Asymmetrique Activity Index']} onValueChange={(value) => handleInputChange('Asymmetrique Activity Index', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select Index" />
                    </SelectTrigger>
                    <SelectContent>
                      {asymmetriqueIndexOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-index" className="text-sm font-medium text-gray-700">Profile Index</Label>
                  <Select value={formData['Asymmetrique Profile Index']} onValueChange={(value) => handleInputChange('Asymmetrique Profile Index', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select Index" />
                    </SelectTrigger>
                    <SelectContent>
                      {asymmetriqueIndexOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-score" className="text-sm font-medium text-gray-700">Activity Score</Label>
                  <Input
                    id="activity-score"
                    type="number"
                    step="0.01"
                    className="mt-1 bg-white"
                    value={formData['Asymmetrique Activity Score']}
                    onChange={(e) => handleInputChange('Asymmetrique Activity Score', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-score" className="text-sm font-medium text-gray-700">Profile Score</Label>
                  <Input
                    id="profile-score"
                    type="number"
                    step="0.01"
                    className="mt-1 bg-white"
                    value={formData['Asymmetrique Profile Score']}
                    onChange={(e) => handleInputChange('Asymmetrique Profile Score', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Information Section */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('additional')}
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Additional Information
              </h3>
              {expandedSections.additional ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {expandedSections.additional && (
              <div className="mt-4 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="lead-quality" className="text-sm font-medium text-gray-700">Lead Quality Assessment</Label>
                  <Select value={formData['Lead Quality']} onValueChange={(value) => handleInputChange('Lead Quality', value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Select lead quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadQualityOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Lead Tags</Label>
                    <Textarea
                      id="tags"
                      className="mt-1 bg-white"
                      value={formData['Tags']}
                      onChange={(e) => handleInputChange('Tags', e.target.value)}
                      placeholder="Enter relevant tags (comma separated)"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-profile" className="text-sm font-medium text-gray-700">Lead Profile Type</Label>
                    <Select value={formData['Lead Profile']} onValueChange={(value) => handleInputChange('Lead Profile', value)}>
                      <SelectTrigger className="mt-1 bg-white">
                        <SelectValue placeholder="Select Lead Profile" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadProfileOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Checkbox
                      id="updates-courses"
                      checked={formData['Receive More Updates About Our Courses'] === 'Yes'}
                      onCheckedChange={(checked) => handleInputChange('Receive More Updates About Our Courses', checked)}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="updates-courses" className="text-sm font-medium">Receive Course Updates</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Checkbox
                      id="supply-chain"
                      checked={formData['Update me on Supply Chain Content'] === 'Yes'}
                      onCheckedChange={(checked) => handleInputChange('Update me on Supply Chain Content', checked)}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="supply-chain" className="text-sm font-medium">Supply Chain Updates</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Checkbox
                      id="dm-content"
                      checked={formData['Get updates on DM Content'] === 'Yes'}
                      onCheckedChange={(checked) => handleInputChange('Get updates on DM Content', checked)}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="dm-content" className="text-sm font-medium">Digital Marketing Updates</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Checkbox
                      id="pay-cheque"
                      checked={formData['I agree to pay the amount through cheque'] === 'Yes'}
                      onCheckedChange={(checked) => handleInputChange('I agree to pay the amount through cheque', checked)}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="pay-cheque" className="text-sm font-medium">Payment by Cheque</Label>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <Checkbox
                    id="free-copy"
                    checked={formData['A free copy of Mastering The Interview'] === 'Yes'}
                    onCheckedChange={(checked) => handleInputChange('A free copy of Mastering The Interview', checked)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="free-copy" className="text-sm font-medium">Request Free Interview Guide</Label>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 -mx-6 px-6 shadow-sm">
            <Button
              type="submit"
              className="w-full py-3 text-base font-medium rounded-lg shadow-md
                         bg-gradient-to-r from-blue-600 to-blue-700 text-white
                         hover:from-blue-700 hover:to-blue-800 transition-all duration-300
                         flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="h-5 w-5" />
              )}
              {loading ? 'Analyzing Lead...' : 'Calculate Conversion Probability'}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI analysis may take a few moments to complete
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};