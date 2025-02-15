const authStackNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const; // readonly로 만들기 위해 as const로 선언

const mapStackNavigations = {
  MAP_HOME: 'MapHome',
} as const;

const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

export {authStackNavigations, mapStackNavigations, mainNavigations};
