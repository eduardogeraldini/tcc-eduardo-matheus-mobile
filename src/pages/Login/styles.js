import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },

  img_container: {
    alignItems: "center",
    marginTop: 50,
  },
  img_home_logo: {
    width: 150,
    height: 150,
  },
  img_home_title: {
    width: 140,
    marginBottom: 20,
  },
  input_container: {
    marginTop: 20,
  },
  input_label: {
    fontSize: 12,
    color: "rgba(59, 59, 59, .7)",
    fontWeight: "bold"
  },
  input_text: {
    color: "#3B3B3B",
    height: 40,
    fontSize: 14,
    borderColor: "rgba(59, 59, 59, .1)",
    borderBottomWidth: 1,
  },
  forgot_password: {
    marginVertical: 10,
    fontSize: 14,
    color: "rgba(59, 59, 59, .7)",
    alignSelf: "flex-end",
  },
  gradient_button: {
    marginTop: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text_button_login: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  text_footer: {
    marginVertical: 15,
    fontSize: 14,
    color: "rgba(59, 59, 59, .7)",
    alignSelf: "center",
  },
  text_register: {
    color: "#E25E31",
    fontWeight: "bold"
  },
  icon_button: {
    width: 25,
  },
});
