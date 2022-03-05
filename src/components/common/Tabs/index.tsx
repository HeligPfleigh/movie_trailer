import React from 'react';
import Box from '../Box';

import TabItem from './TabItem';

interface ITabsProps<T> {
  tabs: Array<{value: T; title: string}>;
  activeTab: T;
  onTabChanged?: (tab: T) => void;
  type?: 'medium' | 'small';
}

function Tabs<T extends string | number>({
  tabs,
  onTabChanged,
  activeTab,
  type = 'medium',
}: ITabsProps<T>) {
  const handleTabPress = (tab: T) => {
    onTabChanged?.(tab);
  };

  return (
    <Box flex={false} row center>
      {tabs.map(tab => (
        <TabItem
          key={tab.value}
          title={tab.title}
          onPress={() => handleTabPress(tab.value)}
          isActive={activeTab === tab.value}
          type={type}
        />
      ))}
    </Box>
  );
}

export default Tabs;
