import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import BackgroundImage from "../../assets/img/bgimage.jpg";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import validationSchema from "./validationSchema";
import validateForm from "../../../utils/validateForm";
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [loginIsActive, setLoginIsActive] = useState(false);
  const [emailIsActive, setEmailIsActive] = useState(false);
  const [passwordIsActive, setPasswordIsActive] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentErrors, setCurrentErrors] = useState({});

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    validateForm(
      { login, email, password },
      validationSchema,
      setCurrentErrors,
      (data) => {
        console.log(data);
        reset();
        navigation.navigate("Home");
      }
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} style={styles.image}>
          <KeyboardAvoidingView
            behavior={"padding"}
            enabled={Platform.OS === "ios"}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={[
                styles.form,
                {
                  transform: [
                    {
                      translateY: isKeyboardVisible
                        ? Platform.OS === "ios"
                          ? 175
                          : 175
                        : 0,
                    },
                  ],
                },
              ]}
            >
              <View style={styles.userImage}>
                <TouchableOpacity style={styles.userImageButton}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: loginIsActive ? "#FF6C00" : "#E8E8E8" },
                  {
                    backgroundColor: currentErrors.login
                      ? "#ff000030"
                      : "#F6F6F6",
                  },
                ]}
                placeholder="Логін"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => {
                  setLoginIsActive(true);
                  setCurrentErrors({});
                }}
                onBlur={() => {
                  setLoginIsActive(false);
                }}
                onChangeText={setLogin}
                value={login}
              />
              {currentErrors.login && (
                <Text style={styles.errorText}>{currentErrors.login}</Text>
              )}
              <TextInput
                keyboardType="email-address"
                style={[
                  styles.input,
                  { borderColor: emailIsActive ? "#FF6C00" : "#E8E8E8" },
                  {
                    backgroundColor: currentErrors.email
                      ? "#ff000030"
                      : "#F6F6F6",
                  },
                ]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => {
                  setEmailIsActive(true);
                  setCurrentErrors({});
                }}
                onBlur={() => {
                  setEmailIsActive(false);
                }}
                onChangeText={setEmail}
                value={email}
              />
              {currentErrors.email && (
                <Text style={styles.errorText}>{currentErrors.email}</Text>
              )}
              <View>
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: passwordIsActive ? "#FF6C00" : "#E8E8E8" },
                    {
                      backgroundColor: currentErrors.password
                        ? "#ff000030"
                        : "#F6F6F6",
                    },
                  ]}
                  placeholder="Пароль"
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={!passwordIsVisible}
                  onFocus={() => {
                    setPasswordIsActive(true);
                    setCurrentErrors({});
                  }}
                  onBlur={() => {
                    setPasswordIsActive(false);
                  }}
                  onChangeText={setPassword}
                  value={password}
                />
                <TouchableOpacity style={[styles.btnShowPassword]}>
                  <Text
                    style={styles.btnShowPasswordText}
                    onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                  >
                    {passwordIsVisible ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              {currentErrors.password && (
                <Text style={styles.errorText}>{currentErrors.password}</Text>
              )}
              <TouchableOpacity style={[styles.btn]} onPress={handleSubmit}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnToLogin]}
                onPress={() => {
                  console.log("Перехід до Логін");
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.btnToLoginText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    resizeMode: "cover",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 16,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    marginTop: -60,
  },
  userImageButton: {
    position: "absolute",
    left: 107,
    bottom: 14,
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    marginHorizontal: 40,
    alignSelf: "center",
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,

    // ,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    marginTop: 27,
    marginHorizontal: 16,
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    paddingVertical: 16,
    color: "#fff",
  },
  btnToLogin: {
    marginTop: 16,
    marginBottom: 62,

    marginHorizontal: 16,
    alignItems: "center",
  },
  btnToLoginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    color: "#1B4371",
    lineHeight: 19,
  },
  btnShowPassword: { position: "absolute", right: 32, top: 16 },
  btnShowPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    color: "#1B4371",
    lineHeight: 19,
  },
  errorText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    marginTop: -16,
    lineHeight: 12,
    marginBottom: 4,
    marginHorizontal: 16,
    color: "#ff0000",
  },
});

export default RegistrationScreen;
