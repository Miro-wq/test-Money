import React from 'react';
import { Icon } from '../../Icons';

import style from './CustomDropIndicator.module.css';

function CustomDropIndicator({ up }) {
  return (
    <div>
      <Icon
        id={up ? '#icon-vector-up' : '#icon-vector-down'}
        className={style.icon}
      />
    </div>
  );
}

export default CustomDropIndicator;
