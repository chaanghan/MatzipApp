import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 35.642782,
    longitude: 129.348409,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        console.log('lat', 'longt', latitude, longitude);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
