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
  Image,
} from "react-native";
import BackgroundImage from "../../../assets/img/bgimage.jpg";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import validationSchema from "./validationSchema";
import validateForm from "../../../utils/validateForm";

import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../redux/authSlice";

const RegistrationScreen = ({ onAuth, route, navigation }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [userFocusPasswordFirst, setUserFocusPasswordFirst] = useState(false);
  const [loginIsActive, setLoginIsActive] = useState(false);
  const [emailIsActive, setEmailIsActive] = useState(false);
  const [passwordIsActive, setPasswordIsActive] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentErrors, setCurrentErrors] = useState({});
  const [imageUserUri, setImageUserUri] = useState(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (route.params?.imageUri) {
      setImageUserUri(route.params.imageUri);
    }
  }, [route]);

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
        dispatch(setIsAuth(true));
      }
    );
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.image}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={[
              styles.form,
              {
                transform: [
                  {
                    translateY: isKeyboardVisible
                      ? Platform.OS === "ios"
                        ? 0
                        : userFocusPasswordFirst
                        ? -10
                        : -60
                      : 0,
                  },
                ],
              },
            ]}
          >
            <View style={styles.userImage}>
              {imageUserUri && (
                <Image
                  style={{ borderRadius: 16 }}
                  source={{ uri: imageUserUri }}
                  width={120}
                  height={120}
                />
              )}
              <TouchableOpacity
                style={[
                  styles.userImageButton,
                  imageUserUri
                    ? {
                        borderRadius: 48,
                        borderWidth: 2,
                        borderColor: "#E8E8E8",

                        overflow: "hidden",
                        transform: [{ rotate: "45deg" }],
                      }
                    : {},
                ]}
                onPress={() => {
                  if (imageUserUri) {
                    setImageUserUri(null);
                  } else {
                    navigation.navigate("Camera", { key: route.key });
                  }
                }}
              >
                {imageUserUri ? (
                  <Feather
                    name="plus"
                    size={22}
                    color="#BDBDBD"
                    backgroundColor="#FFF"
                  />
                ) : (
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                )}
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
                if (userFocusPasswordFirst) setUserFocusPasswordFirst(false);
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
                if (userFocusPasswordFirst) setUserFocusPasswordFirst(false);
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
                // editable={isKeyboardVisible}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!passwordIsVisible}
                onFocus={(event) => {
                  setPasswordIsActive(true);
                  setCurrentErrors({});
                  if (!isKeyboardVisible) setUserFocusPasswordFirst(true);
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
          </View>
          <View style={styles.blankCover}></View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <View style={styles.btnWrapper}>
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
    </ImageBackground>
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
    position: "relative",
    zIndex: 10,
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
    position: "relative",
    zIndex: 10,

    // ,
  },
  blankCover: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 5,
  },
  btnWrapper: {
    backgroundColor: "#fff",
    position: "relative",
    // position: "absolute",
    // bottom: 0,
    // paddingTop: 100,
    // flexShrink: 1,
    zIndex: 10,
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
  btnShowPassword: { position: "absolute", right: 32, top: 16, zIndex: 15 },
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
