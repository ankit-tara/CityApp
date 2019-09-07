import env from "react-native-config";

export function getWcConfig(params={}){
    const woocommerce_config = {
      url: env.API_URL,
      ssl: false,
      consumerKey: env.WOOCOMMERCE_CONSUMER_KEY,
      consumerSecret: env.WOOCOMMERCE_CONSUMER_SECRET,
      wpAPI: true,
      version: "wc/v3",
      queryStringAuth: true,
      params: params
    };
    return woocommerce_config
}