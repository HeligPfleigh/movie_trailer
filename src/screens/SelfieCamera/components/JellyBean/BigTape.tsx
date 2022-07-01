import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';

const BigTape = (props: SvgProps) => (
  <Svg width={97} height={112} fill="none" {...props}>
    <Mask
      id="a"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        maskType: 'alpha',
      }}
      // @ts-ignore
      maskUnits={'userSpaceOnUse'}
      x={0}
      y={0}
      width={97}
      height={112}>
      <Path
        opacity={0.7}
        d="m.531 17.58 21.586 93.755 74.387-17.22L74.918.36.531 17.58Z"
        fill="#CFA86C"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#D7A36E" d="M-16 128h117V26H-16z" />
    </G>
  </Svg>
);

export default BigTape;
