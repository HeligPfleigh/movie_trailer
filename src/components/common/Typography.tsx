import React from 'react';
import {TextProps, Text, StyleSheet} from 'react-native';

import {colors, responsiveSize} from '@movie_trailer/theme';

export interface TypographyProps extends TextProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'caps1'
    | 'caps2'
    | 'caps3'
    | 'caps4'
    | 'caps5'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6';
  children: React.ReactNode;
  color?: string;
  textTransform?: 'uppercase' | 'none' | 'capitalize' | 'lowercase';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'SF Pro Text',
  },
  h1: {
    fontSize: responsiveSize(64),
  },
  h2: {
    fontSize: responsiveSize(48),
  },
  h3: {
    fontSize: responsiveSize(36),
  },
  h4: {
    fontSize: responsiveSize(24),
  },
  h5: {
    fontSize: responsiveSize(20),
  },
  h6: {
    fontSize: responsiveSize(16),
  },
  h7: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(20),
  },
  caps1: {
    fontWeight: 'bold',
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(18),
  },
  caps2: {
    fontWeight: 'bold',
    fontSize: responsiveSize(12),
  },
  caps3: {
    fontWeight: '400',
    fontSize: responsiveSize(12),
  },
  caps4: {
    fontWeight: 'bold',
    fontSize: responsiveSize(10),
  },
  caps5: {
    fontWeight: '600',
    fontSize: responsiveSize(12),
  },
  b1: {
    fontWeight: '400',
    fontSize: responsiveSize(36),
  },
  b2: {
    fontWeight: '400',
    fontSize: responsiveSize(24),
  },
  b3: {
    fontWeight: '400',
    fontSize: responsiveSize(20),
  },
  b4: {
    fontWeight: '400',
    fontSize: responsiveSize(16),
  },
  b5: {
    fontWeight: '600',
    fontSize: responsiveSize(14),
  },
  b6: {
    fontWeight: '400',
    fontSize: responsiveSize(12),
  },
});

export default function Typography({
  variant,
  color,
  textTransform,
  textAlign,
  style,
  children,
  ...props
}: TypographyProps) {
  const variantStyle = variant ? styles[variant] : {};
  return (
    <Text
      {...props}
      style={[
        styles.root,
        color && {color},
        textTransform && {textTransform},
        textAlign && {textAlign},
        variantStyle,
        style,
      ]}>
      {children}
    </Text>
  );
}

Typography.defaultProps = {
  variant: undefined,
  color: colors.black,
  textTransform: undefined,
};
