import axios from "axios";

export const apiURL = "http://10.0.2.2:8800/api";
//"http://143.248.219.116:8800/api"; //외부 휴대폰 ipconfig로 확인.
//" http://localhost:8800/api"
// "http://10.0.2.2:8800/api", // 안드로이드 에뮬레이터

export const apiRequest = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const setCookie = (cookie) => {
  apiRequest.defaults.headers.Cookies = JSON.parse(cookie);
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
