// this is the store of the redux  here all the state will be managed ;
import rootReducer from "./reducers";
import { applyMiddleware, createStore , Middleware  } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from "redux-persist/lib/storage";
import  SetTransform  from './SetTransform';
import { persistStore , persistReducer } from "redux-persist";


const persistConfig = {
  key: 'root',
  storage : storage ,
  transforms: [SetTransform]
}

const persistedReducer = persistReducer(persistConfig , rootReducer);
// const middleWare = applyMiddleware(thunk , logger)

 const store = createStore(
      persistedReducer ,
    //applyMiddleware(thunkMiddleware) 
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
    )

 const persistor = persistStore(store)

export  {persistor , store}
// "homepage": "https://184.168.123.10/~populator/",
