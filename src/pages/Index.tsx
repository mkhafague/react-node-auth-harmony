
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Welcome to Enterprise Portal</h1>
      <p className="text-gray-600">Redirecting to login...</p>
    </div>
  );
};

export default Index;
