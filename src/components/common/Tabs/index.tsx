import React from 'react';

import Box from '../Box';
import TabItem from './TabItem';

interface ITabsProps {
  tabs: string[];
  onTabChanged?: (tab: string) => void;
}

const Tabs: React.FC<ITabsProps> = ({tabs, onTabChanged}: ITabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>(tabs?.[0] ?? '');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChanged?.(tab);
  };

  return (
    <Box flex={false} row center>
      {tabs.map(tab => (
        <TabItem
          key={tab}
          title={tab}
          onPress={() => handleTabPress(tab)}
          isActive={activeTab === tab}
        />
      ))}
    </Box>
  );
};

export default Tabs;
