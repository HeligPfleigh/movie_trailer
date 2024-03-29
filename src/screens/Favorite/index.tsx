import EmptyFavorite from '@movie_trailer/assets/icons/EmptyFavorite';
import {
  AppBar,
  Box,
  HomeBackground,
  MediaSearchCard,
  Tabs,
  Typography,
} from '@movie_trailer/components';
import BasicNativeAdsView from '@movie_trailer/components/ads/BasicNativeAdsView';
import ActorSearchCard from '@movie_trailer/components/share/ActorSearchCard';
import {IActorOverview, IMediaOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  toggleMediaFavorite,
  togglePersonFavorite,
} from '@movie_trailer/store/slices/favoriteSlice';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RemoveFavoritePopup from './RemoveFavoritePopup';

type FavoriteScreenNavigationProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.Favorite
>;

const tabs = [
  {value: 'movie' as const, title: 'Movie'},
  {value: 'tv' as const, title: 'TV Show'},
  {value: 'person' as const, title: 'Actor'},
];

const FavoriteScreen: React.FC<FavoriteScreenNavigationProps> = ({
  navigation,
}: FavoriteScreenNavigationProps) => {
  const movies = useSelector((state: RootState) => state.favorite.movie);
  const tvShows = useSelector((state: RootState) => state.favorite.tv);
  const actors = useSelector((state: RootState) => state.favorite.person);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'movie' | 'person' | 'tv'>(
    'movie',
  );
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
    IMediaOverview | IActorOverview
  >();

  const toggleRemoveFavoritePopup = () => setOpenPopup(prev => !prev);

  const handleOpenSearch = () =>
    navigation.navigate(NavigatorMap.Search as any);

  const handleNavigateToMediaDetail = (id: number) => () => {
    if (activeTab !== 'person') {
      navigation.navigate(NavigatorMap.Home, {
        screen: NavigatorMap.MediaDetail,
        params: {id, type: activeTab},
      });
    }
  };

  const handlePressFavoriteMedia = (item: IMediaOverview) => () => {
    setSelectedItem(item);
    toggleRemoveFavoritePopup();
  };

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <MediaSearchCard
      {...item}
      onPress={handleNavigateToMediaDetail(item.id)}
      onAction={handlePressFavoriteMedia(item)}
    />
  );

  const handleNavigateToActorDetail = (id: number) => () =>
    navigation.navigate(NavigatorMap.Home, {
      screen: NavigatorMap.ActorDetail,
      params: {id},
    });

  const handlePressFavoriteActor = (item: IActorOverview) => () => {
    setSelectedItem(item);
    toggleRemoveFavoritePopup();
  };

  const renderActorItem = ({item}: {item: IActorOverview}) => (
    <ActorSearchCard
      {...item}
      onPress={handleNavigateToActorDetail(item.id)}
      onPressFavorite={handlePressFavoriteActor(item)}
    />
  );

  const handleConfirmRemoveFavorite = () => {
    if (!selectedItem) {
      return;
    }

    if (activeTab === 'movie' || activeTab === 'tv') {
      dispatch(
        toggleMediaFavorite({
          ...(selectedItem as unknown as IMediaOverview),
          type: activeTab,
        }),
      );
    }

    if (activeTab === 'person') {
      dispatch(togglePersonFavorite(selectedItem as unknown as IActorOverview));
    }

    toggleRemoveFavoritePopup();
  };

  const renderEmpty = (
    <Box center middle mt={5}>
      <EmptyFavorite />

      <Box flex={1} mt={2}>
        <Typography variant="h6" color={colors.white}>
          {`There isn't any favorite ${activeTab}.`}
        </Typography>
      </Box>
    </Box>
  );

  const renderFooter = (
    <Box flex={false} m={2}>
      <BasicNativeAdsView />
    </Box>
  );

  const medias =
    activeTab === 'movie' ? movies : activeTab === 'tv' ? tvShows : [];

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box flex={false} mt={6} center ml={2} mr={2}>
        <Box flex={false} row center mb={1}>
          <Box flex={false} style={{paddingTop: spacing(0.5)}}>
            <Typography
              variant="h4"
              color={colors.white}
              fontFamily="Poppins-Bold">
              Archive of your
            </Typography>
          </Box>
          <Box
            flex={false}
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: spacing(1),
              borderRadius: responsiveSize(6),
              marginLeft: spacing(1),
              paddingTop: spacing(0.5),
            }}>
            <Typography
              variant="h4"
              color={colors.royalBlue}
              fontFamily="Poppins-Bold">
              favorite
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" color={colors.white} fontFamily="Poppins-Bold">
          movies
        </Typography>

        <Box flex={false} mt={2}>
          <Typography variant="caps1" color={colors.catskillWhite}>
            Where you can enjoy watching movies anytime
          </Typography>
        </Box>
      </Box>

      <Box flex={false} ml={2} mb={3} center mt={5.5}>
        <Tabs tabs={tabs} onTabChanged={setActiveTab} activeTab={activeTab} />
      </Box>

      {['tv', 'movie'].includes(activeTab) && (
        <FlatList
          data={medias}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
        />
      )}

      {activeTab === 'person' && (
        <FlatList
          data={actors}
          renderItem={renderActorItem}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
        />
      )}

      <RemoveFavoritePopup
        open={openPopup}
        type={activeTab}
        onClose={toggleRemoveFavoritePopup}
        onConfirm={handleConfirmRemoveFavorite}
      />
    </Box>
  );
};

export default FavoriteScreen;
