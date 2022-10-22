import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Alert, StatusBar, Image} from "react-native";
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const larguraCard = Math.round(Dimensions.get('window').width);

export default function MenuPrincipalQuiz() {

    const navigation = useNavigation();
    const [response, setResponse] = useState({vidas: 0, moedas: 0});

    useEffect(()=>{
        navigation.addListener('focus', ()=> {

            AcessarComUsuario();

        })
    },[]);

    async function AcessarComUsuario(usuario){
        try{
            AsyncStorage.getItem('@usuario').then((usuario) => {
                if(usuario !== null){
                    axios.get(`https://quizfutebol.herokuapp.com/buscaUsuarios/${usuario}`)
                    .then((res) => {
                        
                        const dados = res.data.map(function(item){
                            return {
                            moedas: item.moedas,
                            vidas: item.vidas
                            };
                        });
                        setResponse(dados[0]);
                    })
                    .catch((error) => {
                        Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
                    });
                } else {
                    setResponse(1)
                }
            });
        } catch (e) {
            Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
        }
        
    }
    
    function Jogar() {
        navigation.navigate('Jogar')
    }

    return(

        <ImageBackground source={require('../../assets/Principal.png')} resizeMode="cover" style={styles.image}>

            <StatusBar
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "#2A175B"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            />

            <View style={styles.containerDiamante}>
                <View style={styles.containerDiamanteDentro}>
                    <View style={styles.containerDiamante}>
                        <Image 
                        style={{width: 25, height: 25, marginLeft: 5}}
                        Image source={require('../../assets/Vidas.png')} 
                        />
                        <Text style={{textAlign:'center', fontSize: 20, color: '#FFF', marginHorizontal: 10}}>{response.vidas !== null ? response.vidas : null}</Text>
                    </View>


                    
                </View>

                <View style={styles.containerDiamanteDentro}>
                    <View style={styles.containerDiamante}>
                        <Image 
                        style={{width: 25, height: 25, marginLeft: 5}}
                        Image source={require('../../assets/Diamante.png')} 
                        />
                        <Text style={{textAlign:'center', fontSize: 20, color: '#FFF', marginHorizontal: 10}}>{response.moedas !== null ? response.moedas : null}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <TouchableOpacity 
                style={styles.cardJogar}
                onPress={() => {Jogar()}}>
                    <Text style={styles.texto}>Jogar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.cardOutros}
                onPress={() => {palpite()}}>
                    <Text style={styles.textoOutros}>Desafios Diarios</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.cardOutros}
                onPress={() => {palpite()}}>
                    <Text style={styles.textoOutros}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.cardOutros}
                onPress={() => {palpite()}}>
                    <Text style={styles.textoOutros}>Loja</Text>
                </TouchableOpacity>
            </View>
            
        </ImageBackground>
  
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#6949FD',
        alignItems: 'center',
        justifyContent: "center"
    },
    image: {
        flex: 1,
        alignItems: 'center',
    },
    container:{
        flex: 1,
    },
    containerDiamante:{
        flex: 1,
        flexDirection: 'row',
    },
    containerDiamanteDentro:{
        width: larguraCard - 280,
        backgroundColor: '#1F1147', //20212A
        borderRadius: 10,
        height: 30,
        elevation: 7,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#6949FD',
        marginHorizontal: 30
    },
    cardJogar: {
        width: larguraCard - 140,
        backgroundColor: '#6949FD', //20212A
        borderRadius: 10,
        height: 50,
        // Fundo do card
        elevation: 7,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#6949FD',
        justifyContent: "center"
    },
    cardOutros: {
        width: larguraCard - 140,
        backgroundColor: '#1F1147', //20212A
        borderRadius: 10,
        height: 50,
        // Fundo do card
        elevation: 7,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#5538D0',
        justifyContent: "center"
    },
    texto:{
        textAlign: 'center',
        fontSize: 25,
        color: '#FFF',
    },
    textoOutros:{
        textAlign: 'center',
        fontSize: 25,
        color: '#5538D0',
    },
  })