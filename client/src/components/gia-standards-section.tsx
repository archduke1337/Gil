import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Shield, BookOpen, Users } from "lucide-react";

export default function GIAStandardsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gray-900">GIA Standards Compliance</h2>
              <p className="text-blue-600 font-medium">Following World's Leading Gemological Authority</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our laboratory follows the rigorous testing methodologies and grading standards established by the 
            Gemological Institute of America (GIA), the world's foremost authority in gemology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">GIA Testing Protocols</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  We implement the same rigorous testing protocols used by GIA laboratories worldwide, 
                  ensuring our certifications meet international standards for accuracy and reliability.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA 4Cs Diamond Grading System</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA Colored Stone Grading Standards</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA Treatment Detection Methods</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA Origin Determination Techniques</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">GIA Equipment Standards</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our laboratory is equipped with the same state-of-the-art instruments and technology 
                  used in GIA facilities, calibrated to GIA specifications for consistent results.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA-Calibrated Spectrophotometers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA-Standard Microscopy Systems</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA-Approved Measurement Tools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">GIA-Specification Master Stones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">GIA-Trained Gemologists</h3>
                  <p className="text-blue-100">Expertise You Can Trust</p>
                </div>
              </div>
              <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                Our team consists of GIA Graduate Gemologists and Applied Jewelry Professionals 
                who have completed rigorous training at GIA campuses worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  GIA Graduate Gemologist (GG)
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  GIA Applied Jewelry Professional (AJP)
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  GIA Colored Stones Specialist
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  GIA Diamond Grading Specialist
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}