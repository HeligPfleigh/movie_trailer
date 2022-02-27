import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import TabItem from './TabItem';

interface ITabsProps {
  tabs: string[];
  activeTab: string;
  onTabChanged?: (tab: string) => void;
  type?: 'medium' | 'small';
}

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

const Tabs: React.FC<ITabsProps> = ({
  tabs,
  onTabChanged,
  activeTab,
  type = 'medium',
}: ITabsProps) => {
  const handleTabPress = (tab: string) => {
    onTabChanged?.(tab);
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollview}
      showsHorizontalScrollIndicator={false}>
      {tabs.map(tab => (
        <TabItem
          key={tab}
          title={tab}
          onPress={() => handleTabPress(tab)}
          isActive={activeTab === tab}
          type={type}
        />
      ))}
    </ScrollView>
  );
};

export default Tabs;
