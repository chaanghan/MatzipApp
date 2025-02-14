import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import FeedHomScreen from '@/screens/feed/FeedHomScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomScreen} />
      <Drawer.Screen name="CalendarHome" component={CalendarHomeScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
