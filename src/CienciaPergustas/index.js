import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const larguraCard = Math.round(Dimensions.get('window').width);
const alturCard = Math.round(Dimensions.get('window').height);

const shuffleArray=(array)=> {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const Quiz = (props) => {
    const [response, setResponse] = useState({vidas: 0, moedas: 0});
    const navigation = useNavigation();
    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([])
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [ultimaPergunta,setUltimaPergunta] = useState(0);

  
  const getQuiz = async () => {
    setIsLoading(true)

    const url = `https://quizfutebol.herokuapp.com/buscaQuizPerguntas/${props.route.params.idquiz}}`;
    const res = await fetch(url);
    const data = await res.json();

    setQuestions(data);
    setOptions(generateOptionsAndShuffle(data[0]))
    setIsLoading(false)
  };

  useEffect(() => {
    navigation.addListener('focus', ()=> {
      getDados()
    })
    getQuiz();
  }, []);

  async function getDados(){
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

  const handleNextPress=()=>{
    if(ques + 1 === props.route.params.count){
      Alert.alert('Ultima')
    } else {
      setQues(ques+1)
      setOptions(generateOptionsAndShuffle(questions[ques+1]))
    }
  }

  const handleBackPress=()=>{
    if(ques - 1 < 0){
      Alert.alert('Primeira')
    } else {
      setQues(ques-1)
      setOptions(generateOptionsAndShuffle(questions[ques-1]))
    }
  }

  const generateOptionsAndShuffle=(_question)=>{
    const options= [_question.resposta_errada1, _question.resposta_errada2, _question.resposta_errada3]

    options.push(_question.resposta_certa)
 
    shuffleArray(options)
    
    return options
  }

  const handlSelectedOption=(_option, aux)=>{
    if(_option===questions[ques].resposta_certa){
      setScore(score+10)
    }
    console.log(aux)
    if(ques!==aux){
      setQues(ques+1)
      setOptions(generateOptionsAndShuffle(questions[ques+1]))
    }
    if(ques===aux){
        setUltimaPergunta(1)
    }
  }

  const handleShowResult=(score)=>{
    navigation.navigate('Resultados', { score: score })
  }

  return (
    
    <View style={styles.container}>
      {isLoading ? <View style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
        <Text style={{fontSize:32, fontWeight:'700'}}>LOADING...</Text>
      </View> : questions && (
        
        <View style={styles.parent}>
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
          <View style={styles.options}>

            <View style={styles.optionButtomTop}>
              <Text style={styles.question}>{decodeURIComponent(questions[ques].pergunta)}</Text>
            </View>

            <TouchableOpacity style={styles.optionButtomPrimeiro} onPress={()=>handlSelectedOption(options[0],props.route.params.count)}>
              <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={()=>handlSelectedOption(options[1],props.route.params.count)}>
              <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={()=>handlSelectedOption(options[2],props.route.params.count)}>
              <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={()=>handlSelectedOption(options[3],props.route.params.count)}>
              <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>

            <TouchableOpacity style={styles.button} onPress={handleBackPress}>
              <Text style={styles.buttonText}>VOLTAR</Text>
            </TouchableOpacity>
            
{ques!==props.route.params.count &&<TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.buttonText}>PROXIMA</Text>
            </TouchableOpacity> }

{ques===props.route.params.count && ultimaPergunta === 1 &&  <TouchableOpacity style={styles.button} onPress={handleShowResult(score)}>
                                        <Text style={styles.buttonText}>SHOW RESULTS</Text>
                                      </TouchableOpacity> }
            
          </View>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1F1147'
  },
  optionButtomTop: {
    width: larguraCard - 60,
    backgroundColor: '#1F1147', //20212A
    borderRadius: 10,
    height: '40%',
    // Fundo do card
    elevation: 7,
    borderWidth: 1,
    borderColor: '#5538D0',
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    marginVertical: 16,
    flex: 1,
    alignItems: 'center'
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6949FD',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 18,
    color: 'white'
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButtom: {
    width: larguraCard - 60,
    backgroundColor: '#1F1147', //20212A
    borderRadius: 10,
    height: '10%',
    // Fundo do card
    elevation: 7,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#5538D0',
    justifyContent: "center",
    alignItems: "center"
  },
  optionButtomPrimeiro:{
    width: larguraCard - 60,
    backgroundColor: '#1F1147', //20212A
    borderRadius: 10,
    height: '10%',
    // Fundo do card
    elevation: 7,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#5538D0',
    justifyContent: "center",
    alignItems: "center"
  },
  parent: {
    height: '100%',
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
});