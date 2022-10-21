import React, { useState, useEffect, useRef} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuPrincipalQuiz from '../MenuPrincipalQuiz';
import Jogar from '../Jogar';
import CienciaNiveis from '../CienciaNiveis';

const Stack = createNativeStackNavigator();

export default function Main() {

  return (
    <NavigationContainer>
        <Stack.Navigator >
        <Stack.Screen
        name="MenuPrincipalQuiz"
        component={MenuPrincipalQuiz}
        options={{
          headerShown: false
        }}/>
        <Stack.Screen
        name="Jogar"
        component={Jogar}
        options={{
          headerShown: false
        }}/>
        <Stack.Screen
        name="CienciaNiveis"
        component={CienciaNiveis}
        options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}