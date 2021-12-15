import React, { useEffect, useState } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {FontAwesome} from  '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
export default function Entrada({navigation}){
    const [emails,setEmails] = useState([]);
    useEffect(()=>{
        async function getData(){
          const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
          const emails = await response.json();
          setEmails(emails);
        }
        getData();
    },[]);
    function renderItem({item}){
        return <TouchableOpacity style={styles.chat} onPress={()=>navigation.navigate('E-mail', { id: item.id })}>

        <Image style={styles.imgPerfil} source={{uri: item.picture}}/>
        <View style={styles.textbox}>
            <View style={styles.perfil}>
                <Text style={styles.nomeUsuario}>To: {item.to}</Text>
                <Text style={styles.mens}>{item.tittle}</Text>
            </View>
            <View style={styles.timeandstar}>
                <Text style={styles.time}>{item.time}</Text>
                <FontAwesome name={item.star ? 'star'  : 'star-o'}  size={22} color= {item.star ? "yellow" : "black"} style={styles.star}/>
            </View> 
        </View> 
    </TouchableOpacity>;
    }
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.cabecalho}>
                <Text style={styles.caixa}>Caixa de Entrada</Text>
                <Image source={require('../assets/logo.png')}/>
            </View>
            <FlatList
        data={emails}
        renderItem={renderItem}
        keyExtractor = {item => item.id}
        showsVerticalScrollIndicator ={false}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'darkcyan',
        marginTop: Constants.statusBarHeight,
    },
    cabecalho:{
        justifyContent:'space-between',
        flexDirection:'row',
        height:50,
        width:'100%',
        alignItems:'center',
        paddingHorizontal:8,
    },
    caixa:{
        fontSize:22,
        color: 'black',
        fontWeight:'bold',
    },
    chat:{
        flexDirection: 'row',
        width:'auto',
        borderTopWidth:1,
        marginHorizontal:5,
        marginVertical:1,
        borderColor:'white',
    },
    imgPerfil:{
        margin: 5,
        width:50,
        height: 50,
        borderRadius: 30,
    },
    textbox:{
        width: '83%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    nomeUsuario:{
        fontWeight:'bold',
        color: 'black',
    },
    mens:{
        color: 'black',
    },
    time:{
        color: 'black',
    },
    perfil:{
        justifyContent:'center',
        marginLeft:2,
        flexDirection:'column',
    },
    timeandstar:{
        justifyContent:'center',
    }
});