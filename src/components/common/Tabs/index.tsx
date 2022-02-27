import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import TabItem from './TabItem';

interface ITabsProps {
  tabs: string[];
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
  type = 'medium',
}: ITabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>('');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChanged?.(tab);
  };

  useEffect(() => {
    setActiveTab(tabs?.[0] ?? '');
  }, [tabs]);

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollview}>
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
