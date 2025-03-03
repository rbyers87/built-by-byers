import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { WorkoutLog } from '../../types/workout';

export function WorkoutHistory() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkoutHistory() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('workout_logs')
          .select(`
            *,
            workout:workouts (*)
          `)
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workout history:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkoutHistory();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Workout History</h2>
      
      <div className="space-y-4">
        {workouts.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900">{log.workout.name}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(log.completed_at), 'PPP')}
              </p>
              {log.notes && (
                <p className="text-sm text-gray-500 mt-1">{log.notes}</p>
              )}
            </div>
            <div className="text-right">
              <span className="text-indigo-600 font-medium">
                Score: {log.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
