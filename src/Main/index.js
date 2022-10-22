import React, { useState, useEffect, useRef} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuPrincipalQuiz from '../MenuPrincipalQuiz';
import Jogar from '../Jogar';
import CienciaNiveis from '../CienciaNiveis';
import CienciaPerguntas from '../CienciaPergustas';
import Resultados from '../Resultados/indes';

const Stack = createNativeStackNavigator();

export default function Main() {

  return (
    <NavigationContainer>
        <Stack.Navigator >
        <Stack.Screen
        name="MenuPrincipalQuiz"
        component={MenuPrincipalQuiz}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animationEnabled : true
        }}/>
        <Stack.Screen
        name="Jogar"
        component={Jogar}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animationEnabled : true
        }}/>
        <Stack.Screen
        name="CienciaNiveis"
        component={CienciaNiveis}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animationEnabled : true
        }}/>
        <Stack.Screen
        name="CienciaPerguntas"
        component={CienciaPerguntas}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animationEnabled : true
        }}/>
        <Stack.Screen
        name="Resultados"
        component={Resultados}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animationEnabled : true
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}