import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Certificate } from "@shared/schema";

interface AdvancedSearchProps {
  certificates: Certificate[];
  onSearchResults: (results: Certificate[]) => void;
}

interface SearchFilters {
  referenceNumber: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  caratWeight: string;
  dateRange: string;
  isActive: string;
}

export default function AdvancedSearch({ certificates, onSearchResults }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    referenceNumber: "",
    colorGrade: "",
    clarityGrade: "",
    cutGrade: "",
    caratWeight: "",
    dateRange: "",
    isActive: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    if (value && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters(prev => prev.filter(f => f !== key));
    }
  };

  const clearFilter = (key: keyof SearchFilters) => {
    setFilters(prev => ({ ...prev, [key]: "" }));
    setActiveFilters(prev => prev.filter(f => f !== key));
  };

  const clearAllFilters = () => {
    setFilters({
      referenceNumber: "",
      colorGrade: "",
      clarityGrade: "",
      cutGrade: "",
      caratWeight: "",
      dateRange: "",
      isActive: ""
    });
    setActiveFilters([]);
    onSearchResults(certificates);
  };

  const applyFilters = () => {
    let filtered = certificates;

    if (filters.referenceNumber) {
      filtered = filtered.filter(cert => 
        cert.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase())
      );
    }

    if (filters.colorGrade) {
      filtered = filtered.filter(cert => 
        cert.colorGrade?.toLowerCase() === filters.colorGrade.toLowerCase()
      );
    }

    if (filters.clarityGrade) {
      filtered = filtered.filter(cert => 
        cert.clarityGrade?.toLowerCase() === filters.clarityGrade.toLowerCase()
      );
    }

    if (filters.cutGrade) {
      filtered = filtered.filter(cert => 
        cert.cutGrade?.toLowerCase() === filters.cutGrade.toLowerCase()
      );
    }

    if (filters.caratWeight) {
      filtered = filtered.filter(cert => 
        cert.caratWeight?.toString().includes(filters.caratWeight)
      );
    }

    if (filters.isActive) {
      filtered = filtered.filter(cert => 
        filters.isActive === "active" ? cert.isActive : !cert.isActive
      );
    }

    onSearchResults(filtered);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Advanced Search & Filtering</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number</Label>
                <Input
                  id="reference"
                  placeholder="Search by reference..."
                  value={filters.referenceNumber}
                  onChange={(e) => handleFilterChange("referenceNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color Grade</Label>
                <Select value={filters.colorGrade} onValueChange={(value) => handleFilterChange("colorGrade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="D">D (Colorless)</SelectItem>
                    <SelectItem value="E">E (Colorless)</SelectItem>
                    <SelectItem value="F">F (Colorless)</SelectItem>
                    <SelectItem value="G">G (Near Colorless)</SelectItem>
                    <SelectItem value="H">H (Near Colorless)</SelectItem>
                    <SelectItem value="I">I (Near Colorless)</SelectItem>
                    <SelectItem value="J">J (Near Colorless)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clarity">Clarity Grade</Label>
                <Select value={filters.clarityGrade} onValueChange={(value) => handleFilterChange("clarityGrade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select clarity grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FL">FL (Flawless)</SelectItem>
                    <SelectItem value="IF">IF (Internally Flawless)</SelectItem>
                    <SelectItem value="VVS1">VVS1 (Very Very Slightly Included)</SelectItem>
                    <SelectItem value="VVS2">VVS2 (Very Very Slightly Included)</SelectItem>
                    <SelectItem value="VS1">VS1 (Very Slightly Included)</SelectItem>
                    <SelectItem value="VS2">VS2 (Very Slightly Included)</SelectItem>
                    <SelectItem value="SI1">SI1 (Slightly Included)</SelectItem>
                    <SelectItem value="SI2">SI2 (Slightly Included)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cut">Cut Grade</Label>
                <Select value={filters.cutGrade} onValueChange={(value) => handleFilterChange("cutGrade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cut grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carat">Carat Weight</Label>
                <Input
                  id="carat"
                  placeholder="e.g. 1.00"
                  value={filters.caratWeight}
                  onChange={(e) => handleFilterChange("caratWeight", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filters.isActive} onValueChange={(value) => handleFilterChange("isActive", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <Label>Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                      <span className="capitalize">{filter.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => clearFilter(filter as keyof SearchFilters)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex space-x-3">
              <Button onClick={applyFilters} className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Apply Filters</span>
              </Button>
              
              {activeFilters.length > 0 && (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}