import React from 'react'
import s from './checkboxfield.module.scss'

const CheckboxField = ({id, label, formikProps, touched,  error})=>{
	return <div className={s.block}>
		<label htmlFor={id} className={s.container}>{label}
			<input
				id={id} className={s.inputField}
				type="checkbox" {...formikProps}
			/>
			<span className={s.checkmark}/>
		</label>
		{/* Error message if error exist */}
		{touched && error
			? (<div className={s.lineError}>{error}</div>)
			: null}
	</div>
};

export default CheckboxField;