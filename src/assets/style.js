import { StyleSheet, Dimensions } from "react-native";
import { M_BOLD, M_Regular } from "../theme/fonts";
import { APP_ORANGE } from "../theme/colors";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 15,
    elevation: 7
  },
  logo: {
    textAlign: "center",
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: M_BOLD
  },

  block: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center"
  },
  heading: {
    fontSize: 17,
    // fontWeight: 'bold',
    fontFamily: M_BOLD,
    textTransform: "uppercase"
  },
  headingCatAll: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: M_BOLD,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20
  },
  link: {
    fontSize: 12,
    textDecorationLine: "underline"
  },
  box: {
    marginHorizontal: 10,
    width: width / 3 - 30,
    height: width / 3 - 30,
    justifyContent: "space-between"
  },
  boxImage: {
    width: "100%",
    height: "80%",
    borderRadius: 5,
    resizeMode: "cover"
  },
  boxText: {
    textAlign: "center",
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily:M_Regular
  },
  boxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15
  },
  headerMenu: {
    alignItems: "flex-end"
  },
  titleView: {
    borderRadius: 5,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(121, 118, 118, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily:M_BOLD,
    color: "#fff",
    textTransform: "uppercase"
  },
  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  wrap: {
    flexWrap: "wrap"
  },
  singleCity: {
    marginVertical: 10
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: APP_ORANGE,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  },
  btnText: {
    // color:"#fff"
  },
  loaderMsg:{
    textAlign:'center',
    fontSize:20,
    color:"gray",
    fontFamily:M_BOLD,
    marginVertical:20,
    marginHorizontal:20,
    textTransform:'capitalize'
  },
});
