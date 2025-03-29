
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldAlert } from 'lucide-react';

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
