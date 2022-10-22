import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function Resultados(props) {

    const navigation = useNavigation();

    const score = props.route.params.score
    
    const resultBanner= score>10?"https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png" :"https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png"
    
    return (
        <View style={styles.container}>

            <Text style={styles.scoreValue}>{score}</Text>
            <View style={styles.bannerContainer}>
                <Image
                    source={{
                    uri:resultBanner,
                    }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('CienciaNiveis')} style={styles.button}>
                <Text style={styles.buttonText}>GO TO HOME</Text>
            </TouchableOpacity>

        </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#1A759F',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scoreValue:{
    fontSize: 24,
    fontWeight:'800',
    alignSelf:'center'
  }
});