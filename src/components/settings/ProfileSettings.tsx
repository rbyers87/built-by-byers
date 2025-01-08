import React, { useState } from 'react';
    import { useProfile } from '../../hooks/useProfile';
    import { supabase } from '../../lib/supabase';
    import { LoadingSpinner } from '../common/LoadingSpinner';
    
    export function ProfileSettings() {
      const { profile, loading } = useProfile();
      const [updating, setUpdating] = useState(false);
      const [message, setMessage] = useState('');
    
      const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        profile_name: '',
        age: '',
        gender: '',
        avatar_url: '',
      });
    
      React.useEffect(() => {
        if (profile) {
          setFormData({
            first_name: profile.first_name || '',
            last_name: profile.last_name || '',
            profile_name: profile.profile_name || '',
            age: profile.age?.toString() || '',
            gender: profile.gender || '',
            avatar_url: profile.avatar_url || '',
          });
        }
      }, [profile]);
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
    
        setUpdating(true);
        setMessage('');
    
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              first_name: formData.first_name || null,
              last_name: formData.last_name || null,
              profile_name: formData.profile_name || null,
              age: formData.age ? parseInt(formData.age) : null,
              gender: formData.gender || null,
              avatar_url: formData.avatar_url || null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);
    
          if (error) throw error;
          setMessage('Profile updated successfully');
        } catch (error) {
          console.error('Error updating profile:', error);
          setMessage('Error updating profile');
        } finally {
          setUpdating(false);
        }
      };
    
      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setUpdating(true);
        setMessage('');
    
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${profile?.id}.${fileExt}`;
          const filePath = `avatars/${fileName}`;
    
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: true,
            });
    
          if (uploadError) throw uploadError;
    
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
    
          setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
          setMessage('Avatar uploaded successfully');
        } catch (error) {
          console.error('Error uploading avatar:', error);
          setMessage('Error uploading avatar');
        } finally {
          setUpdating(false);
        }
      };
    
      if (loading) return <LoadingSpinner />;
    
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Settings</h2>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
    
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
    
            <div>
              <label htmlFor="profile_name" className="block text-sm font-medium text-gray-700">
                Profile Name
              </label>
              <input
                type="text"
                id="profile_name"
                value={formData.profile_name}
                onChange={(e) => setFormData(prev => ({ ...prev, profile_name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
    
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                id="avatar_upload"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
    
            {message && (
              <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
    
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      );
    }
