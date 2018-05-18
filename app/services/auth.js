import DeviceInfo from 'react-native-device-info';

import http from '../utils/http';

export const login = ({ username, password, loginType, schoolSid }) => {
  const postParams = {
    username,
    password,
    loginType,
    schoolSid,
    DeviceInfoGetter: {
      UniqueID: DeviceInfo.getUniqueID(),
      Manufacturer: DeviceInfo.getManufacturer(),
      Brand: DeviceInfo.getBrand(),
      Model: DeviceInfo.getModel(),
      DeviceId: DeviceInfo.getDeviceId(),
      SystemName: DeviceInfo.getSystemName(),
      SystemVersion: DeviceInfo.getSystemVersion(),
      BundleId: DeviceInfo.getBundleId(),
      BuildNumber: DeviceInfo.getBuildNumber(),
      Version: DeviceInfo.getVersion(),
      ReadableVersion: DeviceInfo.getReadableVersion(),
      DeviceName: DeviceInfo.getDeviceName(),
      UserAgent: DeviceInfo.getUserAgent(),
      DeviceLocale: DeviceInfo.getDeviceLocale(),
      DeviceCountry: DeviceInfo.getDeviceCountry(),
      Timezone: DeviceInfo.getTimezone(),
      InstanceID: DeviceInfo.getInstanceID(),
    },
  };
  return http.requestService('CellLogin', postParams);
};
