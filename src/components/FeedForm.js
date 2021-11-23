import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FeedForm = ({saveFeed}) => {
    //para guardar o estado a gente usa useState para guardar os inputs
    //onPress vai acionar o addFeedScreen e adiconar o title e content e salvar o nosso estado
    const [title, setTitle] = useState();
    const [urlFeed, setUrlFeed] = useState();
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.label}>Titulo do Feed</Text>
            <TextInput style={styles.input} value={title} 
                onChangeText={text => setTitle(text)}/>

            <Text style={styles.label}>URL</Text>
            <TextInput style={styles.input} value={urlFeed} 
                onChangeText={text => setUrlFeed(text)}/>
            
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => {
                    saveFeed(title, urlFeed);
                }}
            >
                <Text style={styles.textButtonStyle}>Salvar</Text>
            </TouchableOpacity>
            
        </View>
    );
};

// //ao criar os campos estão vazios e para evitar erro vamos colocar como default o title e o content vazio
// FeedForm.defaultProps = {
//     initialValues: {
//         title: '',
//         content: ''
//     }
// }

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    buttonn: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    textButtonStyle: {
        fontSize: 20,
        textAlign: 'center',
        color:'red'
    },
    viewStyle:{
        paddingTop: 150
    }

});

export default FeedForm;