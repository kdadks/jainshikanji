import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types';

interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
}

const LocationContext = createContext<{
  locationState: LocationState;
  selectLocation: (location: Location) => void;
  addLocation: (location: Location) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
} | null>(null);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locationState, setLocationState] = useState<LocationState>({
    locations: [
      {
        id: '1',
        name: 'Jain Shikanji - MG Road',
        address: '123 MG Road, Bangalore, Karnataka 560001',
        phone: '+91 9876543210',
        email: 'mgroad@jainshikanji.com',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        deliveryRadius: 10,
        isActive: true,
        operatingHours: [
          { dayOfWeek: 1, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 2, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 3, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 4, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 5, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 6, openTime: '11:00', closeTime: '23:30', isOpen: true },
          { dayOfWeek: 0, openTime: '11:00', closeTime: '23:30', isOpen: true },
        ],
        staff: [],
        inventory: []
      },
      {
        id: '2',
        name: 'Jain Shikanji - Koramangala',
        address: '456 Koramangala, Bangalore, Karnataka 560034',
        phone: '+91 9876543211',
        email: 'koramangala@jainshikanji.com',
        coordinates: { lat: 12.9279, lng: 77.6271 },
        deliveryRadius: 8,
        isActive: true,
        operatingHours: [
          { dayOfWeek: 1, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 2, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 3, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 4, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 5, openTime: '11:00', closeTime: '23:00', isOpen: true },
          { dayOfWeek: 6, openTime: '11:00', closeTime: '23:30', isOpen: true },
          { dayOfWeek: 0, openTime: '11:00', closeTime: '23:30', isOpen: true },
        ],
        staff: [],
        inventory: []
      }
    ],
    selectedLocation: null,
    isLoading: false
  });

  const selectLocation = (location: Location) => {
    setLocationState(prev => ({ ...prev, selectedLocation: location }));
  };

  const addLocation = (location: Location) => {
    setLocationState(prev => ({
      ...prev,
      locations: [...prev.locations, location]
    }));
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocationState(prev => ({
      ...prev,
      locations: prev.locations.map(loc => 
        loc.id === id ? { ...loc, ...updates } : loc
      )
    }));
  };

  const deleteLocation = (id: string) => {
    setLocationState(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== id)
    }));
  };

  return (
    <LocationContext.Provider value={{
      locationState,
      selectLocation,
      addLocation,
      updateLocation,
      deleteLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};