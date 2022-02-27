import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PlayCircleFill = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM8.488 6.366a.625.625 0 0 0-.988.509v6.25a.625.625 0 0 0 .988.509l4.375-3.125a.624.624 0 0 0 0-1.018L8.488 6.366Z"
      fill="#fff"
    />
  </Svg>
);

export default PlayCircleFill;
