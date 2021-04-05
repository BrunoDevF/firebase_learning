import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import firebase from './src/firebaseConnection';

export default function App() {

  
  const [nome,setNome] = useState('');
  const [cargo,setCargo] = useState('');

  useEffect( ()=> {
    async function dados(){
      //Criando novo Nó
      //await firebase.database().ref('tipo').set('Cliente');

      //Removendo um nó
      //await firebase.database().ref('tipo').remove();

      //Inserir novo valor
      //OBS:. caso omita algum valor o banco vai excluir os outros valores, ou seja
      //se no banco tiver um child com dois valores(nome,cargo) e eu passar apenas cargo, ele vai atualizar
      //o cargo e excluir o nome. Entao deve ter muito cuidado para usar mas tem um solução pra isso logo abaixo
      //PARA INSERIR UM NOVO VALOR USA ESSE METODO
      // await firebase.database().ref('usuarios').child(3).set({
      //   nome: 'Zé',
      //   cargo: 'Dev Java'
      // });
      //Para atualizar algum valor na nossa database
      // await firebase.database().ref('usuarios').child(3).update({
      //   nome : 'Augustinho carrara'
      // });

      /*** Usando nossa database ***/
      //On -> olheiro da nossa database
      // await firebase.database().ref('usuarios/2').on('value', (snapshot) => {
      //   setNome(snapshot.val().nome);
      //   setIdade(snapshot.val().idade);
      // });

      //Once -> busca apenas uma vez na tela
      // await firebase.database().ref('nome').once('value', (snapshot)=>{
      //   setNome(snapshot.val());
      // });
    }
    dados();
  }, []);
  async function cadastrar(){
    if(nome !== '' && cargo !== ''){
      let usuarios = await firebase.database().ref('usuarios');
      let chave = usuarios.push().key
      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo
      });

      alert("Cadastrado com sucesso!!!");
      setCargo('');
      setNome('');
    }
    
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

      <Text style={styles.texto}>Cargo</Text>
      <TextInput
        style={styles.textoInput}
        underlineColorAndroid="transparent"
        onChangeText={ (value) => setCargo(value) }
        value={cargo}
      />
      <Button 
        title="Cadastrar novo funcionario"
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
