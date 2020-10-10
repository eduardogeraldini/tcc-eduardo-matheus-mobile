import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },

  header: {
    backgroundColor: '#01B075',
    height: 200,
  },

  info_container: {
    marginTop: 10,
    backgroundColor: "#FFF",
    width: "100%",
  },

  info_details: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  info_details_title: {
    color: "#6C737F",
    fontSize: 18,
  },

  info_details_value: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },

  info_details_percent: {
    fontSize: 16,
    color: "#01B075",
  },

  icon_info_percent: {
    marginRight: 5,
    backgroundColor: "rgba(1, 176, 117, 0.2)",
    borderRadius: 50,
    color: "#01B075",
  },

  info_details_percent_red: {
    fontSize: 16,
    color: "#EF544B",
  },

  icon_info_percent_red: {
    marginRight: 5,
    backgroundColor: "rgba(239, 84, 75, 0.2)",
    borderRadius: 50,
    color: "#EF544B",
  },

  bar_header: {
    marginVertical: 10,
    marginLeft: 20,
  },

  bar_title: {
    color: "#6C737F",
    fontSize: 16,
  },

  bar_sub_title: {
    fontSize: 14,
    fontWeight: "bold",
  },

  bar_footer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: 'center'
  },

  bar_labels: {
    color: "#6C737F",
    fontSize: 12,
    fontWeight: 'bold'
  },

  bar_block_green: {
    width: 15,
    height: 15,
  backgroundColor: "#01B075",
    borderRadius: 5,
    marginRight: 5
  },

  bar_block_red: {
    width: 15,
    height: 15,
    backgroundColor: "#EF544B",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5
  },

});
