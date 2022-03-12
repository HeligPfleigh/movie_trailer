import {Box, Typography} from '@movie_trailer/components';
import {IPeopleOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import truncate from 'lodash/truncate';
import FastImage from 'react-native-fast-image';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useNavigation} from '@react-navigation/native';
import {MediaDetailNavigationProps} from '../types';
import {loadCredits} from '@movie_trailer/store/slices/popularPeopleSlice';
import {useDispatch} from 'react-redux';
import uniqBy from 'lodash/uniqBy';

interface ICreditProps {
  cast: Array<Omit<IPeopleOverview, 'known_for'>>;
  crew: Array<Omit<IPeopleOverview, 'known_for'>>;
  name: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.oxfordBlue,
    paddingTop: spacing(6),
    margin: spacing(2),
    marginTop: spacing(6),
    paddingBottom: spacing(2),
    borderRadius: responsiveSize(8),
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: -32,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    ...round(64),
    backgroundColor: colors.cadetBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImage: {
    left: -80,
    backgroundColor: colors.cornflowerBlue,
  },
});

const configs = [
  {title: 'Directors:', departments: ['Directing']},
  {title: 'Producers:', departments: ['Writing', 'Editing', 'Production']},
  {
    title: 'Composers:',
    departments: [
      'Sound',
      'Camera',
      'Art',
      'Visual Effects',
      'Crew',
      'Costume & Make-Up',
    ],
  },
];

const Credit: React.FC<ICreditProps> = ({cast, crew, name}: ICreditProps) => {
  const navigation = useNavigation<MediaDetailNavigationProps>();
  const dispatch = useDispatch();

  const handlePressImage = (id: number) => () => {
    navigation.push(NavigatorMap.ActorDetail, {id});
  };

  const handleSeeAllCasts = () => {
    dispatch(
      loadCredits(
        cast.map(item => ({
          id: item.id,
          department: item.known_for_department,
          name: item.name,
          thumbnail: `${IMAGE_SERVER}${item.profile_path}`,
        })),
      ),
    );
    navigation.push(NavigatorMap.PopularPeople, {title: `${name}'s actors`});
  };

  const handleSeeAllCrews = (title: string) => () => {
    const departments =
      configs.find(item => item.title === title)?.departments ?? [];
    dispatch(
      loadCredits(
        uniqBy(
          crew
            .filter(item => departments.includes(item.known_for_department))
            .map(item => ({
              id: item.id,
              department: item.known_for_department,
              name: item.name,
              thumbnail: `${IMAGE_SERVER}${item.profile_path}`,
            })),
          'id',
        ),
      ),
    );
    navigation.push(NavigatorMap.PopularPeople, {
      title: `${name}'s ${title.toLowerCase()}`,
    });
  };

  const information = configs.map(item => ({
    title: item.title,
    value: [
      ...new Set(
        crew
          .filter(person =>
            item.departments.includes(person.known_for_department),
          )
          .map(person => person.name),
      ),
    ].join(', '),
  }));

  const images = cast.map(person => ({
    id: person.id,
    value: `${IMAGE_SERVER}${person.profile_path}`,
  }));

  const moreImage = (
    <TouchableOpacity
      style={[styles.image, styles.moreImage]}
      onPress={handleSeeAllCasts}>
      <Typography variant="b4" color={colors.white}>
        {`+${images.length - 4}`}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <Box flex={false} style={styles.container}>
      <Box
        row
        style={[
          styles.imageContainer,
          {
            left: 20 * Math.min(images.length - 1, 5) * 0.5,
          },
        ]}>
        {images.slice(0, 4).map((image, index) => (
          <TouchableOpacity
            style={[styles.image, {left: -20 * index}]}
            key={image.id}
            onPress={handlePressImage(image.id)}>
            <FastImage source={{uri: image.value}} style={styles.image} />
          </TouchableOpacity>
        ))}
        {images.length === 5 && (
          <TouchableOpacity
            style={[styles.image, styles.moreImage]}
            onPress={handlePressImage(images[4].id)}>
            <FastImage source={{uri: images[4].value}} style={styles.image} />
          </TouchableOpacity>
        )}
        {images.length > 5 && moreImage}
      </Box>

      {information.map(item => (
        <TouchableOpacity
          onPress={handleSeeAllCrews(item.title)}
          key={item.title}>
          <Box flex={false} row mt={0.5} ml={2} mr={2}>
            <Box flex={false} mr={2}>
              <Typography
                variant="b5"
                color={colors.blackSqueeze}
                fontFamily="Poppins-Bold">
                {item.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="b5" color={colors.royalBlue}>
                {truncate(item.value, {length: 60})}
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>
      ))}
    </Box>
  );
};

export default Credit;
