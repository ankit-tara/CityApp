import React from "react";
import {View} from 'react-native'
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { APP_ORANGE } from "../theme/colors";

const BannerPlaceholder = ({h=200}) => (
  <View style={{flex:1,height:h}}>
    <Placeholder Animation={Fade}>
      <PlaceholderLine
        width={100}
        height={h}
        style={{ borderRadius: 0 }}
      />
    </Placeholder>
  </View>
);

export default BannerPlaceholder;
