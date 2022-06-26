import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const FlashIcon = ({color, ...props}: SvgProps) => (
  <Svg width={16} height={24} fill="none" {...props}>
    <Path
      d="M5.614 23.943a.703.703 0 0 0 .872-.272l8.437-13.406a.703.703 0 0 0-.595-1.078H8.696L10.79.875A.703.703 0 0 0 9.514.33L1.077 13.735a.703.703 0 0 0 .595 1.078h5.632L5.21 23.124a.703.703 0 0 0 .405.818ZM2.945 13.406l5.4-8.579L7.11 9.72a.703.703 0 0 0 .682.875h5.262l-5.4 8.579L8.89 14.28a.703.703 0 0 0-.682-.875H2.945Z"
      fill={color || '#fff'}
    />
  </Svg>
);

export default FlashIcon;
