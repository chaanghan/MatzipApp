// 웹의 로컬스토리지와 비슷
// 대신 async, await 문법을 사용해야 함

import EncryptedStorage from 'react-native-encrypted-storage';

// 저장하기
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

// 가져오기
const getEncryptStorage = async <T>(key: string) => {
  const storageData = await EncryptedStorage.getItem(key); // storage에서 key에 해당하는 값 가져오기

  return storageData ? JSON.parse(storageData) : null;
};

// 지우기
const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
