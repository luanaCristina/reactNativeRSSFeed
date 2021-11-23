import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'

//persistir os dados
const KEY = 'saved_feeds'

//copiado da biblioeca do async-storage
//recebe um array de posts e salva na memória
const saveFeeds = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(KEY, jsonValue);
        console.log('feed persistido no AsyncStorage');
    } catch (e) {
        //salvando o erro
        console.log('erro: ' + e);
    }
}

const deleteItem = async () => {
    try {
        await AsyncStorage.removeItem(KEY)
        console.log("Foi removido")
    } catch(e){
        alert("não pode apagar o feed");
        console.log('Erro: '+e);
    }
}

const getMyFeed = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY).then(console.log);
      return jsonValue != null ? JSON.parse(jsonValue) : null
      
    } catch(e) {
      alert("Falha ao buscar um feed");
    }
  }

//adicinando o nosso Reducer com o padrão recebendo um estado e uma ação
//esse Reducer vai manipular e retornar o estado. é a nossa variável de estado que vai permitir usar em qualquer tela da nossa app.
//o estado é uma array e por isso iremos usar o filter para excluir ao criar uma nova array
//...state iremos usar o title e urlFeed para as ações
const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            //Cria feed
            let feed = {
                titulo: action.payload.titulo,
                urlFeed: action.payload.urlFeed,
            }
            //adiciona feed ao state
            newState = [
                ...state,
                feed
            ];
            saveFeeds(newState);
            rssFeeds.push(feed) 
            return newState

            case 'delete_feed':
                //Removendo do array 
                rssFeeds.forEach(element => {
                    if(element.urlFeed==action.payload){
                        var index = rssFeeds.indexOf(element);
                        rssFeeds.splice(index, 1); 
                    }
                });

            newState = state.filter(
                (feed) => feed.urlFeed !== action.payload);
            deleteItem(newState);    
            console.log('deletou feed '+action.payload);
            return newState;

            case 'restore_state':
                newState = action.payload;
                return newState;
            case 'delete_all':
                console.log('implementar');
                return state;
            case 'get_all':

                newState = state.getMyFeed;
                return newState;
            default:
                return state;
        }
    };

    const addFeed = dispatch => {
        return (titulo, urlFeed, callback) => {
            if(titulo && urlFeed){
                dispatch({
                    type: 'add_feed', 
                    payload:{  
                        titulo,
                        urlFeed
                    }
                })

                if (callback) {
                    callback();
                }
                console.log('Adicionando feed '+urlFeed);
            }
            else{
                Alert.alert('Atenção!', 'Faltam informações!')
            }
        };
    };


     
     const deleteFeed = dispatch => {
         //console.log('implementar');
        return (id) => {
            dispatch({ type: 'delete_feed', payload: id  });
        };
    };

    const restoreState = dispatch => async () => {
        try {
            const savedState = await AsyncStorage.getItem(KEY);
            if (!savedState) {
                console.log('Nenhum registro encontrado.');
            }
            else {
                dispatch({ type: 'restore_state', payload: JSON.parse(savedState) })
            }
        } catch (e) {
            console.log('erro: ' + e);
        }
    }

const deleteAll = dispatch => {
    return () => {
        //console.log('implementar');
        dispatch({type: 'delete_all'})
    }
}

const rssFeeds = [
    {
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'http://g1.globo.com/dynamo/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
         titulo: 'G1 - Brasil',
         urlFeed: 'http://g1.globo.com/dynamo/brasil/rss2.xml',
         descricao: '',
         urlSite: '',
         urlImagem: ''
     },
     {
         titulo: 'G1 - Tecnologia e Games',
         urlFeed: 'http://g1.globo.com/dynamo/tecnologia/rss2.xml',
         descricao: '',
         urlSite: '',
         urlImagem: ''
     },
    {
        titulo: 'Jovem Nerd - Site Completo',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
    
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    rssFeeds
);
