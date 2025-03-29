
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="space-y-2">
                    {user?.roles.map((role, index) => (
                      <span 
                        key={index} 
                        className="inline-block mr-2 px-3 py-1 text-xs font-medium rounded-full bg-gray-100"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    These roles were assigned to you by your organization administrator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ADFS Authentication Info</h2>
          <p className="text-gray-600 mb-4">
            You are currently authenticated via Active Directory Federation Services. 
            In a real implementation, this section would display additional 
            information about your authentication session, such as:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Identity provider information</li>
            <li>Authentication timestamp</li>
            <li>Session expiration time</li>
            <li>Multi-factor authentication status</li>
            <li>Claims provided by ADFS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
