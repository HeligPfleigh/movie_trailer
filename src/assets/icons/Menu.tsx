import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Menu = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Menu;
