import { StrictMode, useReducer } from 'react';
import { render } from 'react-dom';
import style from './app.css';
import reducer from './reducer';
import { Provider } from './context';

const App = () => {
    const initialState = {
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return <StrictMode>
        <Provider value={{ state, dispatch }}>
            <div className={style.app}>
                <header className={style.header}></header>
                <div className={style.slideshowWrapper}>
                    <div className={style.slideShow}>
                        <div className={`${style.slide} ${style.slide1} ${style.active}`}>One</div>
                        <div className={`${style.slide} ${style.slide2}`}>Two</div>
                        <div className={`${style.slide} ${style.slide3}`}>Three</div>
                    </div>
                </div>

            </div>
        </Provider>
    </StrictMode>
};

render(<App />, document.querySelector('#application'));