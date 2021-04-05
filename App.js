import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

import firebase from './src/firebaseConnection';



export default function App() {

  const [email,setEmail] = useState('');
  const [nome,setNome] = useState('');
  const [password,setPassword] = useState('');

  useEffect( ()=> {
    
  }, []);

  async function cadastrar(){
    // **** CRIAR CONTA
    // await firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then( ( value ) => {
    //   alert('usuario criado com sucesso '+ value.user.email);
    // } )

    // lOGAR
    // await firebase.auth().signInWithEmailAndPassword(email, password)
    // .then( ( value ) => {
    //   alert('Login feito com sucesso: '+ value.user.email);
    //   setUser(value.user.email);
    // } )
    // .catch ( (error)=> {
    //   alert('Ops! Algo deu errado');
    //   return;
    // });
    // setPassword('');
    // setEmail('');

    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then( (value)=>{
      firebase.database().ref('usuarios').child(value.user.uid).set({
        nome: nome
      });
      alert('Usuario cadastrado com sucesso!');
    })
    .catch((error)=>{
      alert('Algo deu errado');
    })
    setNome('');
    setEmail('');
    setPassword('');
  }

  async function loggout(){
    await firebase.auth().signOut();
    setUser('');
    alert('Deslogado com sucesso!!!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.textoInput}
        underlineColorAndroid="transparent"
        onChangeText={ (value) => setNome(value) }
        value={nome}
      />

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

      {/* <Text style={{ marginTop: 20,marginBottom: 20,fontSize: 23, textAlign: 'center' }}>
        {user}
      </Text> */}

    {/* condicional para exibir botao de loggour */}

    {/* {(user.legnth > 0) ? 
    (
        
        <Button 
          title="Sair"
          onPress={loggout}
        />
    ) : (
      <Text style={{ marginTop: 20,marginBottom: 20,fontSize: 23, textAlign: 'center' }}>Nenhum usuario logado</Text>
    )} */}
      

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
