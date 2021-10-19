import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import screensName from './src/components/modal/utils/ScreensName';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  GameScreen: undefined;
  ResultScreen: undefined;
};

const App: React.FC<RootStackParamList> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={screensName.GameScreen} component={GameScreen} />
        <Stack.Screen name={screensName.ResultScreen} component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;