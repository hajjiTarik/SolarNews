import { NetInfo } from 'react-native';

/**
 * initConnection
 */
export default initConnection = () => {

  NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  });

  NetInfo.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );

  return NetInfo;
}

/**
 * @param connectionInfo
 */
function handleFirstConnectivityChange(connectionInfo) {
  console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}