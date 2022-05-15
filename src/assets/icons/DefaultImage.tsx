import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DefaultImage = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M21.287.751H2.714A2.717 2.717 0 0 0 0 3.467v17.069a2.716 2.716 0 0 0 2.714 2.713h18.573A2.715 2.715 0 0 0 24 20.536V3.466A2.716 2.716 0 0 0 21.287.752ZM15.52 4.79a2.622 2.622 0 1 1-.001 5.244 2.622 2.622 0 0 1 0-5.244Zm4.916 15.95H3.94c-.724 0-1.047-.524-.72-1.17l4.5-8.913c.325-.646.947-.704 1.387-.129l4.524 5.913c.44.575 1.21.624 1.718.109l1.107-1.121c.509-.515 1.258-.452 1.673.141l2.866 4.095c.415.593.165 1.075-.56 1.075Z"
      fill="#fff"
    />
  </Svg>
);

export default DefaultImage;
