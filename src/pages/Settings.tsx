import React from 'react';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { UserManagement } from '../components/settings/UserManagement';

export default function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      
      <div className="space-y-6">
        <ProfileSettings />
        <SecuritySettings />
        <NotificationSettings />
        <UserManagement />
      </div>
    </div>
  );
}
