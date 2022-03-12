import React from 'react';
import {fireEvent, render as rtlRender} from '@testing-library/react-native';

import SectionHeader from '../SectionHeader';

describe('SectionHeader', () => {
  test('should match snapshot', () => {
    const wrapper = rtlRender(<SectionHeader title="Popular" />);

    const seeAll = wrapper.queryByText(/see all/i);
    expect(seeAll).toBeTruthy();

    expect(wrapper).toMatchSnapshot();

    wrapper.rerender(<SectionHeader title="Popular" subtitle="Person" />);

    expect(wrapper).toMatchSnapshot();
  });

  test('see all button is clickable', () => {
    const onPress = jest.fn();
    const wrapper = rtlRender(
      <SectionHeader title="Popular" onPress={onPress} />,
    );

    const seeAll = wrapper.getByText(/see all/i);

    fireEvent.press(seeAll);
    expect(onPress).toHaveBeenCalled();
  });
});
