import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CloseFill = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      d="M9 .667C4.417.667.667 4.417.667 9S4.417 17.333 9 17.333s8.333-3.75 8.333-8.333S13.583.667 9 .667Zm4.083 11.25-1.166 1.166L9 10.167l-2.917 2.916-1.166-1.166L7.833 9 4.917 6.083l1.166-1.166L9 7.833l2.917-2.916 1.166 1.166L10.167 9l2.916 2.917Z"
      fill="#fff"
    />
  </Svg>
);

export default CloseFill;
