import React from 'react';
import styles from './formsControls.module.css';
import {required} from "../../utils/validators/validators";
import {Field} from "redux-form";

const Element = ElementsType => ({input, meta: {error, touched}, ...props}) => {
  const hasError = error && touched;
  return (
      <div className={styles.formControl + (hasError && ' ' + styles.error)}>
          <div>
              <ElementsType {...input} {...props} />
          </div>
          {hasError && <span>{error}</span>}
      </div>
  );
};

export const Textarea = Element('textarea');

export const Input = Element('input');

// export const createField = (placeholder, name, type, validators, component, text = '') => {
//     return <>
//         <Field component={component}
//                       name={name}
//                       type={type}
//                       placeholder={placeholder}
//                       validate={validators}
//         /> { text }
//     </>
// };