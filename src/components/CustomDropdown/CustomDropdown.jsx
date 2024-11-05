import React, { useState } from 'react';
import styles from './CustomDropdown.module.css';

const CustomDropdown = ({ options, selectedValue, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownLabel}>{label}</div>
      <div
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === selectedValue)?.label || 'Select'}
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map(option => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
