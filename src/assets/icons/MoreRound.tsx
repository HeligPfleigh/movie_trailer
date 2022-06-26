import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const MoreRoundIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      d="M11 .5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21ZM11 20a9 9 0 1 1 0-17.999A9 9 0 0 1 11 20Zm-3-9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      fill="#fff"
    />
  </Svg>
);

export default MoreRoundIcon;
