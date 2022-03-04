import {Box, Typography} from '@movie_trailer/components';
import {IPeopleOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import truncate from 'lodash/truncate';
import FastImage from 'react-native-fast-image';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';

interface ICreditProps {
  cast: Array<Omit<IPeopleOverview, 'known_for'>>;
  crew: Array<Omit<IPeopleOverview, 'known_for'>>;
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

const Credit: React.FC<ICreditProps> = ({cast, crew}: ICreditProps) => {
  const information = [
    {title: 'Directors:', departments: ['Directing']},
    {title: 'Producers:', departments: ['Writing']},
    {title: 'Composers:', departments: ['Editing', 'Production']},
  ].map(item => ({
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
    <Box flex={false} style={[styles.image, styles.moreImage]}>
      <Typography variant="b4" color={colors.white}>
        {`+${images.length - 4}`}
      </Typography>
    </Box>
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
          <Box
            flex={false}
            style={[styles.image, {left: -20 * index}]}
            key={image.id}>
            <FastImage source={{uri: image.value}} style={styles.image} />
          </Box>
        ))}
        {images.length === 5 && (
          <Box flex={false} style={[styles.image, styles.moreImage]}>
            <FastImage source={{uri: images[4].value}} style={styles.image} />
          </Box>
        )}
        {images.length > 5 && moreImage}
      </Box>

      {information.map(item => (
        <Box flex={false} row mt={0.5} key={item.title} ml={2} mr={2}>
          <Box flex={false} mr={2}>
            <Typography
              variant="b5"
              color={colors.blackSqueeze}
              fontWeight="700">
              {item.title}
            </Typography>
          </Box>
          <Box>
            <Typography variant="b5" color={colors.royalBlue}>
              {truncate(item.value, {length: 60})}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Credit;
