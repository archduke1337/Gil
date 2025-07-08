import { Link } from "wouter";
import { Shield, Lock, Eye, Globe, FileText, CheckCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { usePageTitle } from "@/hooks/use-page-title";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function PrivacyPolicy() {
  usePageTitle("Privacy Policy - GIL Gemological Institute Laboratories");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src={logoPath} alt="GIL Logo" className="h-16 w-auto mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                How we protect and handle your information
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
              Gemological Institute Laboratories ("GIL," "we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our website and services.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-primary" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Contact information (name, email, phone number) when you contact us</li>
                  <li>Certificate verification queries and reference numbers</li>
                  <li>Professional information when using our services</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IP address, browser type, and device information</li>
                  <li>Website usage patterns and page views</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (if provided by your device)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our gemological certification services</li>
              <li>Process certificate verification requests</li>
              <li>Improve our website functionality and user experience</li>
              <li>Communicate with you about our services</li>
              <li>Comply with legal obligations and industry standards</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              Third-Party Services and Advertising
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground mb-2">Google AdSense</h3>
                <p className="text-muted-foreground">
                  We use Google AdSense to display advertisements on our website. Google AdSense uses cookies 
                  and similar technologies to show ads based on your interests. You can opt out of personalized 
                  advertising by visiting <a href="https://adssettings.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  We may use analytics services to understand how visitors use our website. These services 
                  may collect information about your usage patterns to help us improve our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary" />
              Data Security and Retention
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security measures to protect your information 
              against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
              is completely secure.
            </p>
            <p className="text-muted-foreground">
              We retain your information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-primary" />
              Your Rights and Choices
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
              <li>Request information about how your data is processed</li>
              <li>File a complaint with relevant data protection authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-foreground font-medium">Gemological Institute Laboratories</p>
              <p className="text-muted-foreground">Email: privacy@gilab.info</p>
              <p className="text-muted-foreground">Website: <Link href="/" className="text-primary hover:underline">gilab.info</Link></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}