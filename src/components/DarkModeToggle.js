import React, { useState } from 'react';
import { useDarkModeState } from '../context/theme/ThemeProvider';
import '../DarkMode.css';

const DarkMode = () => {
    const { darkTheme, setDarkTheme } = useDarkModeState(); //useDarkMode();
    const [clickedClass, setClickedClass] = useState('clicked');

    const changeMode = (e) => {
        setDarkTheme(!darkTheme);
        setClickedClass('');
        e.target.blur();
    };
    return (
        <button
            className={darkTheme ? clickedClass : ''}
            id="darkMode"
            onClick={(e) => changeMode(e)}
        ></button>
    );
};

export default DarkMode;
