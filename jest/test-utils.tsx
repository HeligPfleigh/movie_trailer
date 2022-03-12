import React from 'react';
import {render as rtlRender} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {rootReducer} from '../src/store/rootReducer';

function render(
  ui,
  {store = configureStore({reducer: rootReducer}), ...renderOptions} = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {render};
