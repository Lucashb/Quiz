import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image, ScrollView, StatusBar} from "react-native";
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const larguraCard = Math.round(Dimensions.get('window').width);

export default function Jogar() {

    const navigation = useNavigation();
    const [response, setResponse] = useState({vidas: 0, moedas: 0});

    useEffect(()=>{

        navigation.addListener('focus', ()=> {
            getDados()
        })
    },[]);

    const Ciencias = async() => {
        navigation.navigate('CienciaNiveis')
    }

    const Historia = async() => {
        navigation.navigate('')
    }

    const Esporte = async() => {
        navigation.navigate('')
    }

    const Bandeiras = async() => {
        navigation.navigate('')
    }

    async function getDados(usuario){
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


    return(

        <ScrollView
        contentContainerStyle={styles.background}
        horizontal={true}>

            <StatusBar
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "#1F1147"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            />

            <View style={styles.containerGeral}>
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
                    style={styles.card}
                    onPress={() => {Ciencias()}}>

                        <Image 
                        style={styles.cardImagem}
                        source={require('../../assets/FundoCiencias.png')} 
                        />
                        
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.card2}
                    onPress={() => {Historia()}}>

                        <Image 
                        style={styles.cardImagem}
                        source={require('../../assets/FundoHistoria.png')} 
                        />

                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.card2}
                    onPress={() => {Esporte()}}>

                        <Image 
                        style={styles.cardImagem}
                        source={require('../../assets/FundoEsportes.png')} 
                        />

                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.card2}
                    onPress={() => {Bandeiras()}}>

                        <Image 
                        style={styles.cardImagem}
                        source={require('../../assets/FundoBandeiras.png')} 
                        />

                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
  
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1F1147'
    },
    containerGeral:{
        flex: 1,
        alignItems: 'center',
    },
    container:{
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    card: {
        width: larguraCard - 100,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6949FD'
    },
    cardImagem:{
        width: larguraCard - 100,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6949FD'
    },
    card2: {
        width: larguraCard - 100,
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
    containerDiamante:{
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