import React, {useState, useEffect} from 'react'
import s from './selectfield.module.scss'

const SelectField = ({
                         id,
                         label,
                         formikProps,
                         touched,
                         error,
                         arrOptions,
                         setLanguage,
                         setTouchedLanguage
                     }) => {
	/* hide/show options for drop-down menu*/
    let [menuToggle, setMenuToggle] = useState(false);

    const changeMenu = (e) => {/* if click on menu item -> pass else hide/show menu*/
        if (!e.relatedTarget?.className.search('item')) {
        	// set touched in formik
            setTouchedLanguage();
            // hide menu
            setMenuToggle(!menuToggle)
        }
    };

    const arrOptionsComponents = arrOptions.length/* if options -> create menu components*/
        ? arrOptions.map(v => <button value={v}
                                      className={s.item}
                                      onClick={e => {
                                          setLanguage(e);
                                          setMenuToggle(!menuToggle)
                                      }}
                                      type="button"
                                      key={v}>{v}</button>)
        : null;

    return <div className={s.block}>
        <label htmlFor={id}>{label}
        	{/* main button like select input */}
            <input id={id} className={s.inputField} {...formikProps}
                   value={formikProps.value || 'Язык'}
                   onClick={changeMenu} onBlur={menuToggle ? changeMenu : null} type='button'/>
            {/* Drop-down menu */}
                   <div className={`${s.hideMenu} ${menuToggle ? s.showMenu : null}`}>
                {arrOptionsComponents}
            </div>
        </label>
		{/* Error message if error exist */}
        {touched && error
            ? (<div className={s.lineError}>{error}</div>)
            : null}
    </div>
};

export default SelectField;