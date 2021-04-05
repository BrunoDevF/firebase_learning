import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './src/firebaseConnection';
import Listagem from './src/Listagem';
export default function App() {

  
  const [nome,setNome] = useState('');
  const [cargo,setCargo] = useState('');
  const [usuarios,setUsuarios] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect( ()=> {
    async function dados(){
      await firebase.database().ref('usuarios').on('value', (snapshot) => {
        setUsuarios([]);
        
        snapshot.forEach((itemChild)=>{
          let data ={
            key: itemChild.key,
            nome: itemChild.val().nome,
            cargo: itemChild.val().cargo
          };
          
          setUsuarios(oldArray => [...oldArray, data].reverse());

        })
        setLoading(false);
      });
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
    {loading ? 
    (
      <ActivityIndicator color="#121212" size={45} />
    ) : 
    (
      <FlatList 
        keyExtractor={ item => item.key }
        data={ usuarios }
        renderItem={ ({ item }) => <Listagem data={ item } /> }
      />
    )
    }
      
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
