import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from './src/firebaseConnection';

export default function App() {

  
  const [nome,setNome] = useState('Carregando...');
  const [idade,setIdade] = useState('Carregando...');

  useEffect( ()=> {
    async function dados(){
      
      //On -> olheiro da nossa database
      await firebase.database().ref('usuarios/2').on('value', (snapshot) => {
        setNome(snapshot.val().nome);
        setIdade(snapshot.val().idade);
      });

      //Once -> busca apenas uma vez na tela
      // await firebase.database().ref('nome').once('value', (snapshot)=>{
      //   setNome(snapshot.val());
      // });
    }
    dados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Olá meu nome é { nome }</Text>
      <Text style={{fontSize: 25}}>Minha idade { idade }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
