import React from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { WorkoutHistory } from '../components/profile/WorkoutHistory';
import { useProfile } from '../hooks/useProfile';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WorkoutHistory />
        </div>
        <div>
          <ProfileStats />
        </div>
      </div>
    </div>
  );
}
