import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm biểu tượng

const UserInfoScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông Tin Người Dùng</Text>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Icon name="user" size={30} color="#FF69B4" style={styles.icon} />
          <Text style={styles.email}>Email: {user.email}</Text>
          <Button title="Đăng Xuất" onPress={signOut} color="#FF69B4" />
        </View>
      ) : (
        <Text>Chưa có thông tin người dùng.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  email: {
    fontSize: 18,
    marginVertical: 10,
  },
  icon: {
    marginBottom: 10,
  },
});

export default UserInfoScreen;
