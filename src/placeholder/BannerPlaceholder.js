import React from "react";
import {View} from 'react-native'
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { APP_ORANGE } from "../theme/colors";

const BannerPlaceholder = () => (
  <View style={{flex:1,height:200}}>
    <Placeholder Animation={Fade}>
      <PlaceholderLine
        width={100}
        height={180}
        style={{ borderRadius: 0 }}
        color={APP_ORANGE}
      />
    </Placeholder>
  </View>
);

export default BannerPlaceholder;
