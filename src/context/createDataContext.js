import React, { useReducer } from 'react';

// as actions serão o nosso delete, create e etc
// essa generalização de contexto que vai receber um reducer e um estado inicial e as ações que iremos plugar nesse contexto e vai devolver que são as funções
export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        // vamos usar o useReducer e dispatch
        // estado inicial e a função de reducer que é passado aqui
        const [state, dispatch] = useReducer(reducer, initialState);
        
        //objeto vazio
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
};
