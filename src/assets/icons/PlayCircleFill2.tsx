import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const PlayCircleFill2 = (props: SvgProps) => (
  <Svg width={36} height={36} fill="none" {...props}>
    <Circle opacity={0.3} cx={18} cy={18} r={18} fill="#FF1F1F" />
    <Circle cx={18} cy={18} r={6.667} fill="#fff" />
    <Path
      d="M30 18a12 12 0 1 1-24 0 12 12 0 0 1 24 0Zm-13.815-4.36a.75.75 0 0 0-1.185.61v7.5a.75.75 0 0 0 1.185.61l5.25-3.75a.75.75 0 0 0 0-1.22l-5.25-3.75Z"
      fill="#FF1F1F"
    />
  </Svg>
);

export default PlayCircleFill2;
