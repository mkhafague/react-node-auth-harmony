
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4">
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
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400">User ID: {user.id}</p>
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
                {user.roles.map((role, index) => (
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
  );
};

export default UserProfile;
