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
      <Card className="rounded-3xl soft-shadow bg-white/80 backdrop-blur-sm border-none">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-primary" />
              <h3 className="text-heading font-heading text-ultra-smooth">Advanced Search & Filtering</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="reference" className="text-body font-body text-ultra-smooth">Reference Number</Label>
                <Input
                  id="reference"
                  placeholder="Search by reference..."
                  value={filters.referenceNumber}
                  onChange={(e) => handleFilterChange("referenceNumber", e.target.value)}
                  className="rounded-2xl text-body font-body text-ultra-smooth"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="color" className="text-body font-body text-ultra-smooth">Color Grade</Label>
                <Select value={filters.colorGrade} onValueChange={(value) => handleFilterChange("colorGrade", value)}>
                  <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
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

              <div className="space-y-3">
                <Label htmlFor="clarity" className="text-body font-body text-ultra-smooth">Clarity Grade</Label>
                <Select value={filters.clarityGrade} onValueChange={(value) => handleFilterChange("clarityGrade", value)}>
                  <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
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

              <div className="space-y-3">
                <Label htmlFor="cut" className="text-body font-body text-ultra-smooth">Cut Grade</Label>
                <Select value={filters.cutGrade} onValueChange={(value) => handleFilterChange("cutGrade", value)}>
                  <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
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

              <div className="space-y-3">
                <Label htmlFor="carat" className="text-body font-body text-ultra-smooth">Carat Weight</Label>
                <Input
                  id="carat"
                  placeholder="e.g. 1.00"
                  value={filters.caratWeight}
                  onChange={(e) => handleFilterChange("caratWeight", e.target.value)}
                  className="rounded-2xl text-body font-body text-ultra-smooth"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="status" className="text-body font-body text-ultra-smooth">Status</Label>
                <Select value={filters.isActive} onValueChange={(value) => handleFilterChange("isActive", value)}>
                  <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
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
                className="space-y-3"
              >
                <Label className="text-body font-body text-ultra-smooth">Active Filters</Label>
                <div className="flex flex-wrap gap-3">
                  {activeFilters.map(filter => (
                    <Badge key={filter} variant="secondary" className="flex items-center space-x-2 rounded-2xl text-body-xs font-body text-ultra-smooth">
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

            <div className="flex space-x-4">
              <Button onClick={applyFilters} className="flex items-center space-x-2 rounded-2xl text-body font-body text-ultra-smooth">
                <Filter className="w-5 h-5" />
                <span>Apply Filters</span>
              </Button>
              
              {activeFilters.length > 0 && (
                <Button onClick={clearAllFilters} variant="outline" className="rounded-2xl text-body font-body text-ultra-smooth">
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