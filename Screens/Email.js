import React, { useEffect, useState } from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {FontAwesome} from  '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
export default function Email({route}){
    const {id} = route.params;
    const [email,setEmail] = useState([]);
    useEffect(()=>{
        async function getData(){
          const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id);
          const email = await response.json();
          setEmail(email);
        }
        getData();
    },[]);
    return(
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.assunto}>{email.tittle}</Text>
                <FontAwesome name={email.star ? 'star'  : 'star-o'}  size={30} color= {email.star ? "yellow" : "black"} style={styles.star}/>
            </View>
            <View style={styles.envio}>
                <View style={styles.imgto}>
                    <Image style={styles.imgfrom} source={{uri:email.picture}}/>
                    <View style={styles.tofrom}>
                        <Text style={styles.from}> From: {email.from}</Text>
                        <Text style={styles.from}> To: {email.to}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{email.time}</Text>
            </View>
            <WebView style={styles.corpotexto} fontSize={20}
                source={{html: `<div style="font-size: 60; padding: 10;">${email.body}</div>`}}
            />
            <StatusBar style="auto"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'darkcyan',
    },
    titulo:{
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 10,
        borderBottomWidth:1,
        borderColor:'white',
    },
    assunto:{
        fontWeight: 'bold',
        fontSize: 44,
        color: 'black',
    },
    envio:{
        flexDirection: 'row',
        padding:10,
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'white',
    },
    imgfrom:{
        width:50,
        height: 50,
        borderRadius: 30,
        margin: 5,
    },
    tofrom:{
        flexDirection:'column',
    },
    imgto:{
        flexDirection:'row',
        alignItems:'center',
    },
    from:{
        color: 'black',
        fontSize: 18,
        fontWeight:'bold',
    },
    time:{
        color:'black',
        fontSize:16,
    },
    corpotexto:{
        borderStyle: 'solid',
        borderColor: 'black',
        margin:5,
        backgroundColor:'darkcyan',
    }
})