import React from 'react'
import s from './inputfield.module.scss'

const InputField = ({id, label,placeholder , formikProps, touched,  error})=>{
	return <div className={s.block}>
		<label htmlFor={id}>{label}</label>
		<input
			id={id} className={s.inputField}
			type="text" {...formikProps}
			placeholder={placeholder}
		/>
		{/* Error message if error exist*/}
		{touched && error
			? (<div className={s.lineError}>{error}</div>)
			: null}
	</div>
};

export default InputField;