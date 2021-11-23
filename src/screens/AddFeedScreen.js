import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import FeedForm from '../components/FeedForm';
import {Context} from '../context/FeedListContext'

const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(Context);
    // Implementar formulário de adição de RSS feeds, passando título e link. Demais informações devem ser obtidas do arquivo XML (tag channel), como imagem, descrição, etc.</Text>
    return (
        <View>
        <FeedForm saveFeed={
            (title, urlFeed) => {
             addFeed(
                 title,
                 urlFeed,
                 () => navigation.navigate('Index'))}
        }></FeedForm>
     </View>
    );
};

const styles = StyleSheet.create({});

export default AddFeedScreen;
