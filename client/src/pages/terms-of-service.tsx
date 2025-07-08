import { Link } from "wouter";
import { Scale, FileText, AlertTriangle, Shield, Users, Globe } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { usePageTitle } from "@/hooks/use-page-title";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function TermsOfService() {
  usePageTitle("Terms of Service - GIL Gemological Institute Laboratories");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src={logoPath} alt="GIL Logo" className="h-16 w-auto mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
              <p className="text-lg text-muted-foreground">
                Legal terms and conditions for using our services
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-8">
          <div className="border-b pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              <strong>Effective Date:</strong> January 7, 2025<br />
              <strong>Last Updated:</strong> January 7, 2025
            </p>
            <p className="text-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of the Gemological Institute Laboratories ("GIL") 
              website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Description of Services
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                GIL provides professional gemological services including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Diamond and gemstone certification and grading</li>
                <li>Certificate verification services</li>
                <li>Educational resources about gemology</li>
                <li>Professional gemological analysis tools</li>
                <li>Access to our gemstone database and encyclopedia</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Scale className="h-6 w-6 mr-2 text-primary" />
              User Responsibilities
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">You agree to:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to compromise the security of our systems</li>
                <li>Not engage in any activity that could harm our reputation or services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The content, layout, design, data, databases, and graphics on this website are protected by 
              intellectual property laws and are owned by GIL or its licensors. You may not reproduce, 
              distribute, or create derivative works without explicit permission.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">
                <strong>Certificate Data:</strong> All certificate information, grading reports, and 
                gemological data are proprietary to GIL and protected by copyright and database rights.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
              Disclaimers and Limitations
            </h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground mb-2">Service Availability</h3>
                <p className="text-muted-foreground text-sm">
                  We strive to maintain continuous service availability but cannot guarantee uninterrupted access. 
                  Services may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Professional Accuracy</h3>
                <p className="text-muted-foreground">
                  While we maintain high professional standards, gemological assessments are based on available 
                  technology and expertise at the time of evaluation. GIL is not liable for decisions made based 
                  on our certificates or assessments.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              Third-Party Content and Advertising
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our website may contain advertisements and links to third-party websites. We are not responsible 
                for the content, privacy policies, or practices of these third parties.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground mb-2">Advertising Policy</h3>
                <p className="text-muted-foreground text-sm">
                  We use Google AdSense to display advertisements. These ads are selected based on content 
                  relevance and user interests. We do not endorse or guarantee the products or services 
                  advertised on our website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy and Data Protection</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by and construed in accordance with applicable laws. Any disputes 
              arising from these Terms or your use of our services shall be resolved through appropriate 
              legal channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting to this page. Your continued use of our services constitutes acceptance of the 
              modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-foreground font-medium">Gemological Institute Laboratories</p>
              <p className="text-muted-foreground">Email: legal@gilab.info</p>
              <p className="text-muted-foreground">Website: <Link href="/" className="text-primary hover:underline">gilab.info</Link></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}