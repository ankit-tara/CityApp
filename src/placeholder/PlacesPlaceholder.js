import React from "react";
import {View} from 'react-native'
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { APP_ORANGE } from "../theme/colors";

const PlacesPlaceholder = () => (
    <Placeholder Animation={Fade}>
      <PlaceholderLine
        width={100}
        height={180}
        style={{ borderRadius: 0,marginVertical:10 ,margin:0}}
        color={APP_ORANGE}
      />
      <PlaceholderLine
        width={100}
        height={180}
        style={{ borderRadius: 0,marginVertical:10 }}
        color={APP_ORANGE}
      />
      <PlaceholderLine
        width={100}
        height={180}
        style={{ borderRadius: 0,marginVertical:10 }}
        color={APP_ORANGE}
      />
    </Placeholder>
);

export default PlacesPlaceholder;
