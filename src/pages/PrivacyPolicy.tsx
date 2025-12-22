import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2025</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Omit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our browser extension and companion web application.
            </p>
            <p>
              By installing the Omit extension or using our service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">1. Authentication Information</h3>
            <p>
              When you log in to the Omit web application, we synchronize minimal authentication details (User ID and Access Token) with the browser extension. This ensures your settings and tasks are securely synced across your devices.
            </p>

            <h3 className="text-lg font-semibold">2. Web History & Usage Data</h3>
            <p>
              To provide our core functionality—blocking distracting websites and tracking focus time—the Omit extension needs to read the URLs of the tabs you visit. 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Local Processing:</strong> All URL checking and blocking decisions happen locally on your device.</li>
              <li><strong>No Tracking:</strong> We do NOT track, store, or transmit your browsing history to our servers or any third parties. We only verify if a URL matches your personal blocklist.</li>
              <li><strong>Focus Stats:</strong> We only store aggregated statistics (e.g., "2 hours saved") and do not store specific browsing history logs.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use the collected data solely for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide the extension's core functionality (blocking sites and tracking productivity).</li>
              <li>To synchronize your personal settings, tasks, and blocked lists between the web app and extension.</li>
              <li>To maintain your secure login session.</li>
            </ul>
            <p className="font-medium mt-4">
              We do not sell, trade, or rent your personal identification information to others.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored securely using industry-standard local storage and encrypted connections for any synchronization with our web application.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this Privacy Policy, please contact us via the support channels in the application.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
