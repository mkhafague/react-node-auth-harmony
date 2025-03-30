
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ADFSCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        // Get the authorization code from URL
        const code = searchParams.get('code');
        
        if (!code) {
          throw new Error('Authorization code not found in the URL');
        }
        
        // In a real implementation, you would exchange the code for tokens
        // by making a request to your backend or ADFS token endpoint
        
        // Example of token exchange (not implemented in this demo):
        /*
        const tokenResponse = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        
        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange authorization code for tokens');
        }
        
        const tokens = await tokenResponse.json();
        
        // Store tokens in localStorage
        localStorage.setItem('adfs_token', tokens.access_token);
        
        // Parse the JWT to get user info
        const userInfo = parseJwt(tokens.id_token);
        localStorage.setItem('adfs_user', JSON.stringify({
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          roles: userInfo.roles || [],
          tokenExpiration: Date.now() + (tokens.expires_in * 1000)
        }));
        */
        
        // For demo purposes, we'll just redirect to dashboard
        // as if the authentication was successful
        navigate('/dashboard');
      } catch (err) {
        console.error('Error processing authentication callback:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };
    
    processAuthCallback();
  }, [searchParams, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {error ? (
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            {error}. <button className="underline" onClick={() => navigate('/login')}>Return to login</button>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <h1 className="text-2xl font-bold">Processing Authentication</h1>
          <p className="text-gray-600">Please wait while we complete your sign-in...</p>
        </div>
      )}
    </div>
  );
};

export default ADFSCallback;
