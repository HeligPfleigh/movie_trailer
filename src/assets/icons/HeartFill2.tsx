import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HeartFill2 = (props: SvgProps) => (
  <Svg width={24} height={22} viewBox="0 0 24 22" fill="none" {...props}>
    <Path
      d="M6.444 1C3.376 1 .89 3.462.89 6.5c0 2.452.972 8.272 10.542 14.156a1.094 1.094 0 0 0 1.138 0C22.139 14.772 23.11 8.952 23.11 6.5c0-3.038-2.488-5.5-5.556-5.5C14.488 1 12 4.333 12 4.333S9.512 1 6.444 1Z"
      fill="#FF1F1F"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HeartFill2;
