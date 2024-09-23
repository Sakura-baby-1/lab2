import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm biểu tượng

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  // Nếu chưa xác thực, chuyển đến màn hình đăng nhập
  if (user === null) {
    navigation.navigate('Login');
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF69B4" />
        <Icon name="lock" size={30} color="#FF69B4" style={styles.icon} />
        <Text style={styles.loadingText}>Đang chuyển hướng đến màn hình đăng nhập...</Text>
      </View>
    );
  }

  return <>{children}</>; // Nếu đã xác thực, hiển thị nội dung con
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginTop: 10,
  },
});

export default ProtectedRoute;
