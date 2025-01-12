import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import {
  withClassPath,
  withApplyPlugin,
  withGoogleServicesFile,
} from '@expo/config-plugins/build/android/GoogleServices';
import { withReactNativeBatchMainActivity } from './android/withReactNativeBatchMainActivity';
import { withReactNativeBatchAppBuildGradle } from './android/withReactNativeBatchAppBuildGradle';
import { withReactNativeBatchInfoPlist } from './ios/withReactNativeBatchInfoPlist';
import { withReactNativeBatchAppDelegate } from './ios/withReactNativeBatchAppDelegate';

export type Props = { androidApiKey: string; iosApiKey: string, enableDoNotDistrub?: boolean };
/**
 * Apply react-native-batch configuration for Expo SDK 42 projects.
 */
const withReactNativeBatch: ConfigPlugin<Props | void> = (config, props) => {
  const _props = props || { androidApiKey: '', iosApiKey: '' };

  let newConfig = withGoogleServicesFile(config);
  newConfig = withClassPath(newConfig);
  newConfig = withApplyPlugin(newConfig);
  newConfig = withReactNativeBatchAppBuildGradle(newConfig, _props);
  newConfig = withReactNativeBatchMainActivity(newConfig);
  newConfig = withReactNativeBatchInfoPlist(newConfig, _props);
  newConfig = withReactNativeBatchAppDelegate(newConfig);
  // Return the modified config.
  return newConfig;
};

const pkg = {
  // Prevent this plugin from being run more than once.
  // This pattern enables users to safely migrate off of this
  // out-of-tree `@config-plugins/react-native-batch` to a future
  // upstream plugin in `react-native-batch`
  name: '@batch.com/react-native-plugin',
  // Indicates that this plugin is dangerously linked to a module,
  // and might not work with the latest version of that module.
  version: 'UNVERSIONED',
};

export default createRunOncePlugin(withReactNativeBatch, pkg.name, pkg.version);
