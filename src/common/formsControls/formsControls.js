import React from 'react';
import styles from './formsControls.module.css';

const Element = ElementsType => ({input, meta, ...props}) => {
  const hasError = meta.error && meta.touched;
  return (
      <div className={styles.formControl + (hasError && ' ' + styles.error)}>
          <div>
              <ElementsType {...input} {...props} />
          </div>
          {hasError && <span>{meta.error}</span>}
      </div>
  )
};

export const Textarea = Element('textarea');

export const Input = Element('input');