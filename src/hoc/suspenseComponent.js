import React,  { Suspense } from 'react';

export const suspenseComponent = Component => {
  return  (props => {
      return (
          <Suspense fallback={<div>Loading...</div>}>
              <Component {...props}/>
          </Suspense>
      )
  })
};