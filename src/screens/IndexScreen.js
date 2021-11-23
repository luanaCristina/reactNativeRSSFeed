import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Context } from '../context/FeedListContext'

const IndexScreen = ({ navigation }) => {
     //adicionando o valor que consta dentro do parâmetro do FeedContext
     const { state, deleteFeed, restoreState} = useContext(Context);

     //para que na primeira vez que a gente usar vamos executar o restorState
     useEffect(() => {
        restoreState();
    }, []);

    //value estará retornando o que passamos no parâmetro no Context
    //FlatList estamos adicionando uma lista para receber os objetos do blogPost
    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.urlFeed}
                renderItem={({ item }) => {
                    return (
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => 
                                    navigation.navigate('Show', { id: item.urlFeed })}>
                                    <Text style={styles.title}>{item.titulo}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => {deleteFeed(item.urlFeed)}}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                    );
                }}
            />
        </>
    );
};

//adicionando o + na tela superior. É possível porque estamos usando o StackNavigation (wrap)
//O headrRight vai adicionar de fato o +
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() =>  navigation.navigate('Add')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        )
    };
};

//adicionando o estilo do nossa coluna, tíulo e ícone
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;
