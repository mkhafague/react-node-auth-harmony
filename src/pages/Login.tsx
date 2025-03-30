
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldAlert, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Get the destination from location state or default to home
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async () => {
    login();
    setIsRedirecting(true);
    
    // Simulate redirection after successful login
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Enterprise Login
          </CardTitle>
          <CardDescription>
            Sign in with your organization credentials using ADFS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {error && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Clicking the button below will redirect you to your organization's 
              authentication service where you can securely sign in.
            </p>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={handleLogin}
              disabled={isLoading || isRedirecting}
            >
              {isLoading || isRedirecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRedirecting ? "Redirecting..." : "Authenticating..."}
                </>
              ) : (
                "Sign in with ADFS"
              )}
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about-adfs">
              <AccordionTrigger className="text-sm text-gray-500">
                <span className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  About ADFS Authentication
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-500">
                <p className="mb-2">
                  Active Directory Federation Services (ADFS) provides Single Sign-On (SSO) 
                  capabilities for your organization's applications.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your login credentials never leave your organization's systems</li>
                  <li>No need to remember multiple passwords for different applications</li>
                  <li>Securely access applications with your organizational identity</li>
                  <li>Automatically sign out from all applications when you close your session</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="troubleshooting">
              <AccordionTrigger className="text-sm text-gray-500">
                <span className="flex items-center">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Troubleshooting
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-500">
                <p className="mb-2">If you're having trouble signing in:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure you're using your organizational email and password</li>
                  <li>Clear your browser cookies and cache</li>
                  <li>Check if you need to be on the corporate network or VPN</li>
                  <li>Contact your IT department if problems persist</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="px-8 text-center text-sm text-gray-500">
            This login process will securely authenticate you using your
            organization's Active Directory Federation Services.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
