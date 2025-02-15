import {alerts} from '@/constants/message';
import {PERMISSIONS} from './../../node_modules/react-native-permissions/src/permissions';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, RESULTS, Permission} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';
type PERmissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PERmissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};
const iosPermissions: PERmissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

// 권한의 타입을 받음
function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const permissionOS =
        Platform.OS === 'android' ? androidPermissions : iosPermissions;
      const checked = await check(permissionOS[type]); // 해당 권한을 체크하는 함수, 체크한 결과를 할당
      console.log(checked);

      switch (checked) {
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          Alert.alert(
            alerts[`${type}_PERMISSION`].TITLE,
            alerts[`${type}_PERMISSION`].DESCRIPTION,
            [
              {
                text: '설정',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '취소',
                style: 'cancel',
              },
            ],
          );
      }
    })();
  });
}

export default usePermission;
