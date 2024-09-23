import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { AuthContext } from '../AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm biểu tượng

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert("Đăng nhập thành công!", "Chào mừng bạn trở lại.");
      navigation.navigate('UserInfo');
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      Alert.alert("Lỗi đăng nhập", error.code === 'auth/wrong-password' 
        ? "Mật khẩu không đúng." 
        : error.code === 'auth/user-not-found' 
        ? "Người dùng không tồn tại." 
        : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#FF69B4" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#FF69B4" style={styles.icon} />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <Button title="Đăng nhập" onPress={handleLogin} color="#FF69B4" />
        <Button title="Chưa có tài khoản? Đăng ký" onPress={() => navigation.navigate('Signup')} />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FF69B4',
    marginVertical: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
