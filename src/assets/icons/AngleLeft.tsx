import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AngleLeft = ({color, ...props}: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Path
      d="m8.46 12.71 5.66 5.65a1.002 1.002 0 0 0 1.71-.705 1 1 0 0 0-.29-.705l-4.95-5L15.54 7a1 1 0 0 0 0-1.41 1 1 0 0 0-.71-.3 1 1 0 0 0-.71.3l-5.66 5.65a1 1 0 0 0 0 1.47Z"
      fill={color || '#fff'}
    />
  </Svg>
);

export default AngleLeft;
