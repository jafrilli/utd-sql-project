import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [cardId, setCardId] = useState(null)

    useEffect(() => {
        setCardId(localStorage.getItem('cardId'))
    }, [])

    useEffect(() => {
        localStorage.setItem('cardId', cardId)
    }, [cardId])

    return (
        <AppContext.Provider value={{ cardId, setCardId }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}