import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

import firebase from './src/firebaseConnection';



export default function App() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect( ()=> {
    
  }, []);

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( ( value ) => {
      alert('usuario criado com sucesso '+ value.user.email);
    } )
    .catch ( (error)=> {
      if(error.code === 'auth/weak-password'){
        alert('Senha deve ter pelo menos 6 caracteres');
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert('O email que você está tentando é invalido!');
        return;
      }else {
        alert('Ops! Algo deu errado');
        return;
      }
    })
    setPassword('');
    setEmail('');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.textoInput}
        underlineColorAndroid="transparent"
        onChangeText={ (value) => setEmail(value) }
        value={email}
      />

      <Text style={styles.texto}>Password</Text>
      <TextInput
        style={styles.textoInput}
        // underlineColorAndroid="transparent"
        onChangeText={ (value) => setPassword(value) }
        value={password}
      />
      <Button 
        title="Cadastrar"
        onPress={cadastrar}
      />
    
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
  text: {
    fontSize: 20
  },
  textoInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    height: 40,
    fontSize: 18
  }
});
