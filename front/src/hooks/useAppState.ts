import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeback] = useState(false); // 다른 앱에서 맵 앱으로 돌아왔는지에 대한 여부

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComeback, appStateVisible};
}

export default useAppState;
