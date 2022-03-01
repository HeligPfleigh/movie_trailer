import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import TabItem from './TabItem';

interface ITabsProps<T> {
  tabs: Array<{value: T; title: string}>;
  activeTab: T;
  onTabChanged?: (tab: T) => void;
  type?: 'medium' | 'small';
}

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

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
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollview}
      showsHorizontalScrollIndicator={false}>
      {tabs.map(tab => (
        <TabItem
          key={tab.value}
          title={tab.title}
          onPress={() => handleTabPress(tab.value)}
          isActive={activeTab === tab.value}
          type={type}
        />
      ))}
    </ScrollView>
  );
}

export default Tabs;
