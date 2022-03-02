import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Check = (props: SvgProps) => (
  <Svg width={21} height={16} fill="none" {...props}>
    <Path
      d="M7.729 15.937c-.323 0-.633-.128-.861-.357L.358 9.07A1.218 1.218 0 1 1 2.08 7.348l5.599 5.597L18.873.407a1.219 1.219 0 0 1 1.818 1.622L8.637 15.53a1.22 1.22 0 0 1-.874.407H7.73Z"
      fill="#5D5FEF"
    />
  </Svg>
);

export default Check;
