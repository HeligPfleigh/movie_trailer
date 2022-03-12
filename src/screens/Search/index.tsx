import {
  Box,
  HomeBackground,
  MediaSearchCard,
  Tabs,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CloseIcon from '@movie_trailer/assets/icons/Close';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Search from '@movie_trailer/assets/icons/Search';
import Micro from '@movie_trailer/assets/icons/Micro';
import CloseFill from '@movie_trailer/assets/icons/CloseFill';
import {useDispatch, useSelector} from 'react-redux';
import {
  requestSearchMovie,
  requestSearchPeople,
  requestSearchTV,
  setActiveSearchTab,
} from '@movie_trailer/store/slices/searchSlice';
import throttle from 'lodash/throttle';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  actorSearchResultSelector,
  movieSearchResultSelector,
  tvSearchResultSelector,
} from '@movie_trailer/store/selectors/search';
import {IActorOverview, IMediaOverview} from '@movie_trailer/core/types';
import ActorSearchCard from '@movie_trailer/components/share/ActorSearchCard';
import MovieIcon from '@movie_trailer/assets/icons/Movie';
import {TextField} from 'react-native-material-textfield';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Voice, {
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';

type SearchScreenNavigationProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.Search
>;

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginVertical: spacing(4),
    marginHorizontal: spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    top: spacing(-1),
  },
  voiceInputBtn: {
    ...round(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeVoiceInputBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const tabs = [
  {value: 'movie' as const, title: 'Movie'},
  {value: 'tv' as const, title: 'TV Show'},
  {value: 'person' as const, title: 'Actor'},
];

const SearchScreen: React.FC<SearchScreenNavigationProps> = ({
  navigation,
}: SearchScreenNavigationProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isVoiceActive, setVoiceActive] = useState<boolean>(false);
  const activeTab = useSelector(
    (state: RootState) => state.search.activeSearchTab,
  );
  const movies = useSelector(movieSearchResultSelector);
  const tvShows = useSelector(tvSearchResultSelector);
  const actors = useSelector(actorSearchResultSelector);

  const dispatch = useDispatch();
  const throttled = useRef(
    throttle(newValue => {
      dispatch(requestSearchMovie(newValue));
      dispatch(requestSearchTV(newValue));
      dispatch(requestSearchPeople(newValue));
    }, 500),
  );
  const textFieldRef = useRef<TextField>(null);

  useEffect(() => {
    throttled.current(searchText);
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      textFieldRef.current?.focus();

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
        setVoiceActive(false);
        textFieldRef.current?.clear();
      };
    }, []),
  );

  const handleBack = () => navigation.goBack();

  const handleTabChanged = (tab: 'movie' | 'tv' | 'person') => {
    dispatch(setActiveSearchTab(tab));
  };

  const handleClearSearch = () => {
    setSearchText('');
    textFieldRef.current?.clear();
  };

  const handleNavigateToMediaDetail = (id: number) => () => {
    if (activeTab !== 'person') {
      navigation.navigate(NavigatorMap.Home, {
        screen: NavigatorMap.MediaDetail,
        params: {id, type: activeTab},
      });
    }
  };

  const voiceRecognizeHandler = useCallback((e: SpeechResultsEvent) => {
    if (e.value?.length) {
      const value = e.value[0];
      textFieldRef.current?.setValue(value);
      setSearchText(value);
    }
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = (e: SpeechStartEvent) => {
      if (e.error === false) {
        setVoiceActive(true);
      }
    };

    Voice.onSpeechEnd = () => {
      setVoiceActive(false);
    };

    Voice.onSpeechResults = voiceRecognizeHandler;

    Voice.onSpeechError = () => {
      // TODO: some ui to interact with user
      setVoiceActive(false);
    };
  }, [voiceRecognizeHandler]);

  const handlePressVoiceSearch = async () => {
    try {
      await requestMultiple([
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.IOS.SPEECH_RECOGNITION,
      ]);

      await Voice.start('en-US');
    } catch (error) {
      // TODO: handle error
    }
  };

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <MediaSearchCard {...item} onPress={handleNavigateToMediaDetail(item.id)} />
  );

  const handleNavigateToActorDetail = (id: number) => () =>
    navigation.navigate(NavigatorMap.Home, {
      screen: NavigatorMap.ActorDetail,
      params: {id},
    });

  const renderActorItem = ({item}: {item: IActorOverview}) => (
    <ActorSearchCard {...item} onPress={handleNavigateToActorDetail(item.id)} />
  );

  const renderEmpty = (
    <Box center middle mt={5}>
      <MovieIcon />

      <Typography variant="h6" color={colors.white}>
        {'No search results found '}
        <Typography variant="h6" fontFamily="Poppins-Bold" color={colors.white}>
          {`“${searchText}“`}
        </Typography>
      </Typography>

      <Box flex={false} mt={0.5}>
        <Typography color={colors.cadetBlue}>
          Please try another keyword
        </Typography>
      </Box>
    </Box>
  );

  const medias =
    activeTab === 'movie' ? movies : activeTab === 'tv' ? tvShows : [];

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <SafeAreaView>
        <Box row mt={2.5} pl={2} pr={2} flex={false}>
          <TouchableOpacity onPress={handleBack}>
            <CloseIcon />
          </TouchableOpacity>
        </Box>

        <Box flex={false} style={styles.searchContainer}>
          <Search fill={colors.white} />
          <Box middle ml={2}>
            <TextField
              ref={textFieldRef}
              label="Search movie, tv show, actor, ..."
              onChangeText={setSearchText}
              value={searchText}
              lineType="none"
              textColor={colors.white}
              fontSize={responsiveSize(18)}
              baseColor={colors.white}
              tintColor={colors.white}
              containerStyle={styles.textField}
              autoFocus
            />
          </Box>
          <TouchableOpacity onPress={handleClearSearch}>
            <Box mr={2} flex={false}>
              <CloseFill />
            </Box>
          </TouchableOpacity>
          <Box
            flex={false}
            style={[
              styles.voiceInputBtn,
              isVoiceActive ? styles.activeVoiceInputBtn : {},
            ]}>
            <TouchableOpacity onPress={handlePressVoiceSearch}>
              <Micro fill={colors.white} />
            </TouchableOpacity>
          </Box>
        </Box>

        {Boolean(searchText) && (
          <>
            <Box flex={false} ml={2} mb={3}>
              <Tabs
                tabs={tabs}
                onTabChanged={handleTabChanged}
                activeTab={activeTab ?? 'movie'}
              />
            </Box>

            {['tv', 'movie'].includes(activeTab ?? '') && (
              <FlatList
                data={medias}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                ListEmptyComponent={renderEmpty}
              />
            )}

            {activeTab === 'person' && (
              <FlatList
                data={actors}
                renderItem={renderActorItem}
                keyExtractor={item => `${item.id}`}
                ListEmptyComponent={renderEmpty}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </Box>
  );
};

export default SearchScreen;
