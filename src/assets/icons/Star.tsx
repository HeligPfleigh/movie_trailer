import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Star = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      d="m14.189 5.517-3.967-.576-1.774-3.596a.502.502 0 0 0-.897 0L5.778 4.941l-3.967.576a.5.5 0 0 0-.277.853l2.87 2.799-.678 3.951a.5.5 0 0 0 .725.527L8 11.78l3.548 1.866a.5.5 0 0 0 .725-.527l-.678-3.951 2.87-2.799a.498.498 0 0 0-.277-.853Z"
      fill="#F3A228"
    />
  </Svg>
);

export default Star;
