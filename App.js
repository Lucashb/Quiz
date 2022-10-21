import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Alert, StatusBar, Image} from "react-native";
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Main from './src/Main';

export default function App() {

  useEffect(()=>{

        AsyncStorage.getItem('@usuario').then((usuario) => {
            if(usuario === null){
              CriarUsuario();
            } 
        });
  },[]);

  async function CriarUsuario() {
    try {
        var numero = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
        var aux = 'Player' + numero;
        
        const dados = {
            nome_usuario: aux,
            moedas: 100,
            valor: 0,
            vidas: 5
        }

        try {
            await axios.get(`https://quizfutebol.herokuapp.com/buscaUsuarios/${dados[0].nome_usuario}`)
            .then((res) => {
                if(!res.data.length) {
                    axios.post(`https://quizfutebol.herokuapp.com/insereUsuarios/`, dados)
                    .then((res) => {
                        AsyncStorage.setItem('@usuario', res.data.nome_usuario)
                    })
                    .catch((error) => {
                        Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
                    });
                } else {
                    var numero2 = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
                    var aux2 = 'Player' + numero2 + 'R';
                    
                    const dados = {
                        nome_usuario: aux2,
                        moedas: 100,
                        valor: 0,
                        vidas: 5
                    }

                    axios.post(`https://quizfutebol.herokuapp.com/insereUsuarios/`, dados)
                    .then((res) => {
                        AsyncStorage.setItem('@usuario', res.data.nome_usuario)
                    })
                    .catch((error) => {
                        Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
                    });
                }
            })
            .catch((error) => {
                Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
            });
            
        } catch (e) {
            Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
        }
    } catch (e) {
        Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
    }
  }

  return (
    <Main />    
  );
}