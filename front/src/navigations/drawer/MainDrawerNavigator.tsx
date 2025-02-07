import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MapHomeScreen from '../../screens/MapHomeScreen';
import FeedHomScreen from '../../screens/FeedHomScreen';
import CalendarHomeScreen from '../../screens/CalendarHomeScreen';

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
