import { StrictMode, useReducer } from 'react';
import { render } from 'react-dom';
import style from './app.css';
import reducer from './reducer';
import { Provider } from './context';

const App = () => {
    const initialState = {
        // slides: [
        //     {
        //         name: "1",
        //         active: true
        //     }
        //     {
        //         name: "2",
        //         active: false
        //     }
        //     {
        //         name: "3",
        //         active: false
        //     }
        // ]
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return <StrictMode>
        <Provider value={{ state, dispatch }}>
            <div className={style.app}>
                <header className={style.header}></header>
                <div className={style.slideshowWrapper}>
                    <div className={style.slideShow}>
                        {/* {state.slides.map() => {}} */}
                        <div className={`${style.slide} ${style.slide1}`}>One</div>
                        <div className={`${style.slide} ${style.slide2}`}>Two</div>
                        <div className={`${style.slide} ${style.slide3}`}>Three</div>
                    </div>
                    <div className={style.buttons}>
                        <button className={style.leftButton}><i class="fa fa-caret-square-left"></i></button>
                        <button className={style.rightButton}><i class="fa fa-caret-square-right"></i></button>
                    </div>
                </div>

            </div>
        </Provider>
    </StrictMode>
};

render(<App />, document.querySelector('#application'));