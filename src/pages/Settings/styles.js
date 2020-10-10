import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  block_header: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
  },
  block_title: {
    fontWeight: 'bold',
  },
  block_button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  }
});
