import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Season = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M16.667 5.833H3.333c-.92 0-1.666.746-1.666 1.667v9.167c0 .92.746 1.666 1.666 1.666h13.334c.92 0 1.666-.746 1.666-1.666V7.5c0-.92-.746-1.667-1.666-1.667ZM14.167 1.667 10 5.833 5.833 1.667"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Season;
