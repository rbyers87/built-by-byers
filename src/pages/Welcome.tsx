import React from 'react';
    
    export default function Welcome() {
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Workout Tracker</h1>
          <p className="text-lg text-gray-700 mb-8">
            Start tracking your workouts and achieve your fitness goals!
          </p>
          <img
            src="https://images.unsplash.com/photo-1556817411-31ae72ab8ea4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Fitness"
            className="mx-auto rounded-lg shadow-md mb-8 max-w-md"
          />
          <p className="text-gray-600">
            Use the navigation bar to access different features.
          </p>
        </div>
      );
    }
