import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.__reanimatedWorkletInit = jest.fn();

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('@react-native-firebase/analytics', () => () => {
  return {
    logScreenView: jest.fn(),
  };
});

jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn().mockImplementation(() => {
    return Promise.resolve();
  }),
  isAvailable: jest.fn(),
}));

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@react-native-voice/voice', () => 'Voice');
