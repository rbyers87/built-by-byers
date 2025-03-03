import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import type { Profile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={fullName}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
              {profile.profile_name && (
                <p className="text-gray-500">@{profile.profile_name}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-gray-500">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{profile.email}</span>
            </div>
            {profile.age && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{profile.age} years old</span>
              </div>
            )}
            {profile.gender && (
              <div className="px-2 py-1 rounded-full bg-gray-100 text-sm">
                {profile.gender}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
