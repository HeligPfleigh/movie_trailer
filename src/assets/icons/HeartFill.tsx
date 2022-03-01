import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HeartFill = (props: SvgProps) => (
  <Svg width={33} height={30} fill="none" viewBox="0 0 33 30" {...props}>
    <Path
      d="M16.975 3.775C18.25 2.2 19.85 1.05 21.85.525c6.65-1.7 12.5 4.275 10.75 10.95-1.025 3.95-3.45 7.075-6.1 10.05-2.375 2.675-5.025 5.1-7.85 7.3-1.275 1-2.2.975-3.475-.025-4.575-3.65-8.8-7.65-11.9-12.7C1.975 14 1 11.75.95 9.2.9 5.525 2.95 2.35 6.325.925c3.35-1.4 7.1-.675 9.675 1.9.3.325.6.6.975.95Z"
      fill="#FB573C"
    />
  </Svg>
);

export default HeartFill;
