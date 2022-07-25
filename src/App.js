import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import configureStore from './redux/configureStore';
import MainContainer from './MainContainer';

const {store, persistor} = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
