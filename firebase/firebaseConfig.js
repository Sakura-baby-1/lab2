import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAeJ7NPV0bL1aPWKV8SlvjaumOMIXirkGI",
  authDomain: "lab2-3630d.firebaseapp.com",
  databaseURL: "https://lab2-3630d-default-rtdb.firebaseio.com",
  projectId: "lab2-3630d",
  storageBucket: "lab2-3630d.appspot.com",
  messagingSenderId: "788366826412",
  appId: "1:788366826412:web:7cb0372545419e33447809",
  measurementId: "G-EYHY4GN5FD"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với AsyncStorage để lưu trữ trạng thái đăng nhập
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Khởi tạo Firestore
const db = getFirestore(app);

export { auth, db };
