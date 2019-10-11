import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Picker
} from "react-native";
import { M_BOLD } from "../../../theme/fonts";
import { text_truncate } from "../../../Utils/Helpers";
import { getWcConfig } from "../../../Utils/WcApi";
import WooCommerceAPI from "../WoocommerceApi";
import Product from "./Product";
import CartIcon from "../CartIcon";
import AccountIcon from "../../../components/Header/AccountIcon";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../../../theme/colors";
import Icon from "react-native-vector-icons/dist/Entypo";
const { width } = Dimensions.get("window");
let boxCount = 2;
let boxWidth = width / boxCount - 3;
const initialSubCategory = [
  {
    id: -1,
    name: "All Category"
  }
];

let wcConfig = getWcConfig();
let wcApi = new WooCommerceAPI(wcConfig);

const ProductList = props => {
  const [products, setproducts] = useState([]);
  const [parentProducts, setparentProducts] = useState([]);
  const [gridStyle, setgridStyle] = useState(1);
  const [subcategory, setsubcategory] = useState(-1);
  const [selectedSubcat, setselectedSubcat] = useState(-1);
  const [showloader, setshowloader] = useState(true);
  useEffect(() => {
    let params = props.navigation.state.params;
    if (params && params.category && params.category.id) {
      wcApi
        .get("products?category=" + params.category.id, {})
        .then(data => {
          setshowloader(false);
          console.log(data);
          if (data && Array.isArray(data)) {
            setproducts(data);
            setparentProducts(data);
          }
        })
        .catch(error => {
          setshowloader(false);

          console.log(error);
        });

      wcApi
        .get("products/categories?parent=" + params.category.id, {})
        .then(data => {
          console.log(data);
          if (data && Array.isArray(data)) {
            setsubcategory(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  getSubCatProduct = id => {
    setselectedSubcat(id);
    setshowloader(true);
    if (id == -1) {
      setproducts(parentProducts);
      setshowloader(false);
      return;
    }
    wcApi
      .get("products?category=" + id, {})
      // .get("products?category=" + params.category.id, {})
      .then(data => {
        setshowloader(false);

        console.log(data);
        if (data && Array.isArray(data)) {
          setproducts(data);
        }
      })
      .catch(error => {
        setshowloader(false);

        console.log(error);
      });
  };
  if (showloader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner style={styles.spinner} type="9CubeGrid" color={APP_ORANGE} />
      </View>
    );
  }
  if (!parentProducts.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontFamily: M_BOLD,
            textAlign: "center"
          }}
        >
          Oops!! No products found for this category.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: 10,
          margin: 10,
          borderWidth: 1,
          borderColor: "#ccc"
        }}
      >
        <View>
          <Picker
            style={{ height: 50, width: 220 }}
            selectedValue={selectedSubcat}
            onValueChange={value => {
              getSubCatProduct(value);
            }}
          >
            <Picker.Item label="No Category Selected" value="-1" />
            {subcategory.length > 0 &&
              subcategory.map(item => (
                <Picker.Item
                  label={item.name}
                  value={item.id}
                  key={`item${item.id}`}
                />
              ))}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            borderColor: "#ccc"
          }}
        >
          <TouchableOpacity onPress={() => setgridStyle(!gridStyle)}>
            <Icon
              name="grid"
              size={30}
              style={{ marginHorizontal: 10 }}
              color={gridStyle == 1 ? "black" : "#ccc"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setgridStyle(!gridStyle)}>
            <Icon
              name="menu"
              size={30}
              style={{ marginHorizontal: 10 }}
              color={gridStyle != 1 ? "black" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productsList}>
          {products.length > 0 &&
            products.map(product => {
              if (product.stock_status != "instock") return;
              return (
                <View
                  style={[
                    styles.product,
                    gridStyle == 1 ? styles.gridStyle : styles.menuStyle
                  ]}
                  key={`product-${product.id}`}
                >
                  <Product item={product} />
                </View>
              );
            })}
          {!products.length && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                  fontFamily: M_BOLD,
                  textAlign: "center"
                }}
              >
                Oops!! No products found for this category.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
ProductList.navigationOptions = ({ navigation }) => {
  let name = "Shop";
  let params = navigation.state.params;
  if (params && params.category && params.category.name) {
    name = text_truncate(params.category.name, 15);
  }
  return {
    title: name,
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: M_BOLD,
      textTransform: "capitalize"
    },
    headerRight: (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 10
        }}
      >
        <CartIcon />
        <AccountIcon />
      </View>
    )
  };
};
export default ProductList;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: APP_SIDE_DISTANCE,
    // marginTop:20
  },
  productsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 40
  },
  product: {
    // width: boxWidth,
    marginBottom: 20
  },
  menuStyle: {
    width: width / 1 - 3
  },
  gridStyle: {
    width: width / 2 - 3
  },
  flex: {
    flex: 1
  }
});
