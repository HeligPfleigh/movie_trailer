import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';

const PopularPeopleScreen: React.FC = () => {
  const handleOpenSearch = () => {
    // TODO: implement
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          Popular People
        </Typography>
      </Box>

      {/* <Box flex={false} style={styles.filterContainer} onLayout={handleLayout}>
        <Typography variant="caps1" color={colors.white}>
          {`${totalResult} item${totalResult !== 1 ? '(s)' : ''}`}
        </Typography>

        <TouchableOpacity style={styles.filterBtn} onPress={toggleFilter}>
          <Filter />
          <Box flex={false} ml={1} mr={1}>
            <Typography variant="caps1" color={colors.white}>
              Filter
            </Typography>
          </Box>
          <ArrowDown />
        </TouchableOpacity>
      </Box> */}

      {/* <Box ml={2} mr={2}>
        <FlatList
          data={medias}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentumRef.current = false;
          }}
          ListFooterComponent={
            currentPage < totalPage ? <ActivityIndicator /> : null
          }
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={30}
          windowSize={10}
          getItemLayout={getItemLayout}
        />
      </Box> */}

      {/* <FilterPopup
        open={openFilter}
        top={filterPosition}
        onClose={toggleFilter}
        selected={filterMode}
        onSelectFilter={setFilterMode}
      /> */}
    </Box>
  );
};

export default PopularPeopleScreen;
