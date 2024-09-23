import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm biểu tượng

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userInfo = { email };
      await saveUserInfo(userId, userInfo);
      Alert.alert("Đăng ký thành công!", "Bạn đã đăng ký thành công.");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      Alert.alert("Lỗi đăng ký", error.code === 'auth/email-already-in-use' 
        ? "Email này đã được sử dụng." 
        : error.message);
    }
  };

  const saveUserInfo = async (userId, userInfo) => {
    try {
      await setDoc(doc(db, "users", userId), userInfo);
      console.log("Thông tin người dùng đã được lưu.");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng Ký</Text>
        <Icon name="user-plus" size={50} color="#FF69B4" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title="Đăng Ký" onPress={handleSignup} color="#FF69B4" />
        <Button title="Đã có tài khoản? Đăng nhập" onPress={() => navigation.navigate('Login')} color="#FF69B4" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFAF0',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#FF69B4',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default SignupScreen;
