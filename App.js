import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import UserInfoScreen from './components/UserInfoScreen';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
              headerTitle: 'Đăng Nhập',
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerLeft: () => <Icon name="sign-in" size={24} color="#FFF" style={{ marginLeft: 15 }} />,
            }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{
              headerTitle: 'Đăng Ký',
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerLeft: () => <Icon name="user-plus" size={24} color="#FFF" style={{ marginLeft: 15 }} />,
            }} 
          />
          <Stack.Screen 
            name="UserInfo" 
            options={{
              headerTitle: 'Thông Tin Người Dùng',
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerLeft: () => <Icon name="user" size={24} color="#FFF" style={{ marginLeft: 15 }} />,
            }}
          >
            {(props) => (
              <ProtectedRoute>
                <UserInfoScreen {...props} />
              </ProtectedRoute>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF69B4', // Màu nền tiêu đề
  },
  headerTitle: {
    color: '#FFF', // Màu chữ tiêu đề
    fontWeight: 'bold', // Kiểu chữ tiêu đề
  },
});

export default App;
