import React from 'react'
import s from './formbody.module.scss'
import InputField from "./InputField/InputField";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CheckboxField from "./CheckboxField/CheckboxField";
import SelectField from "./SelectField/SelectField";

const FormBody = () => {
    const formik = useFormik({
        /* initial values for all form */
        initialValues: {
            firstName: '',
            email: '',
            phoneNumber: '',
            language: '',
            userAgree: false
        },
        /* object with validation properties */
        validationSchema: Yup.object({
            /* input name */
            firstName: Yup.string()/* string from 3 to 50 symbols */
                .required('Обязательное поле')
                .min(3, 'Минимум три символа')
                .max(50, 'Не более 50 символов')
                /* only letters, - and spaces */
                .matches(/^[a-zA-Zа-яА-Я -]+$/g, "Цифры и символы в имени не допустимы"),
            /* input email */
            email: Yup.string()/* string with email template less then 40 symbols*/
                .required('Обязательное поле')
                .email('Введите адрес корректно')
                .max(40, "Не более 40 символов"),
            /* input phone number */
            phoneNumber: Yup.string()/* string with strict 11 digits and +,-,),( */
                .required('Обязательное поле')
                /* plus only on start of string, only digits and +,-,),( */
                .matches(/^(?:\s*\+)?[\d\s\-)(]+$/g, "Введите корректно номер")
                /* check that string have 11 digits */
                .test("", "Номер состоит из 11 цифр",
                    (value) => value?.replace(/(\+|\-|\s|\)|\()/g, '').length === 11),
            /* choose language from drop-down menu */
            language: Yup.string()
                .required('Выберите язык'),
            /* put checkbox for user agreement */
            userAgree: Yup.boolean()
                .required('Обязательное поле')
                .oneOf([true], 'Обязательно ознакомтись с условиями использования.')
        }),
        /* Submit function */
        onSubmit: values => {

            const templatePhone = (str) => {
                return [...str.replace(/(\+|\-|\s|\)|\()/g, '')].reduce((t,v,i)=>{
                if(i===1||i===4||i===7||i===9){
                    return t + "-" + v
                }else{
                    return t + v
                }},'+')
            }

            const prepareData = `
            Имя:            ${values.firstName}
            Email:          ${values.email}
            Телефон:    ${templatePhone(values.phoneNumber)}
            Язык:           ${values.language}`

            alert(prepareData)
            console.log(prepareData)
        }
    });
    /* set new value for language from Select component */
    const setLanguage = e => formik.setFieldValue('language', e.target.value);
    /* set touched modification for language */
    const setTouchedLanguage = () => formik.setFieldTouched('language', true);

    return <div className={s.block}>
        {/* Header block */}
        <div className={s.header}>
            <h1 className={s.headTitle}>Регистрация</h1>
            <span>Уже есть аккаунт? <a href="/" className={s.link}>Войти</a></span>
        </div>
        {/* Form area */}
        <form onSubmit={formik.handleSubmit} className={s.form}>
            {/* input name */}
            <InputField id={`firstName`}
                        label={`Имя`}
                        placeholder={`Введите Ваше имя`}
                        formikProps={formik.getFieldProps('firstName')}
                        touched={formik.touched.firstName}
                        error={formik.errors.firstName}/>
            {/* input email */}
            <InputField id={`email`}
                        label={`Email`}
                        placeholder={`Введите ваш email`}
                        formikProps={formik.getFieldProps('email')}
                        touched={formik.touched.email}
                        error={formik.errors.email}/>
            {/* input phone number */}
            <InputField id={`phoneNumber`}
                        label={`Номер телефона`}
                        placeholder={`Введите номер телефона`}
                        formikProps={formik.getFieldProps('phoneNumber')}
                        touched={formik.touched.phoneNumber}
                        error={formik.errors.phoneNumber}/>
            {/* choose language from drop-down menu */}
            <SelectField id={`language`}
                         label={`Язык`}
                         formikProps={formik.getFieldProps('language')}
                         touched={formik.touched.language}
                         error={formik.errors.language}
                         arrOptions={[`Русский`, "Английский", `Китайский`, "Испанский"]}
                         setLanguage={setLanguage}
                         setTouchedLanguage={setTouchedLanguage}/>
            {/* put checkbox for user agreement */}
            <CheckboxField id={`userAgree`}
                           label={<>Принимаю <a href='/' className={s.link}>условия</a> использования</>}
                           formikProps={formik.getFieldProps('userAgree')}
                           touched={formik.touched.userAgree}
                           error={formik.errors.userAgree}/>
            {/* if all fields is correct -> submit for all form */}
            <button type='submit'
                    className={`${s.subBtn} ${!formik.dirty || !formik.isValid
                        ? s.subBtn__disabled
                        : null}`}
                    disabled={!formik.dirty || !formik.isValid}>
                Зарегистрироватся
            </button>
        </form>
    </div>
};

export default FormBody;