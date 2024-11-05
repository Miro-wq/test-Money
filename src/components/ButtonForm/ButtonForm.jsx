import PropTypes from 'prop-types';
import styles from './ButtonForm.module.css';

const ButtonForm = ({
  type,
  text,
  handlerFunction,
  variant,
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handlerFunction}
      className={`${styles.buttonForm} ${styles[variant]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

// Definim tipurile așteptate pentru fiecare prop:
ButtonForm.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Tipul trebuie să fie unul din valorile specificate.
  text: PropTypes.string.isRequired, // Textul trebuie să fie un șir de caractere și este necesar.
  handlerFunction: PropTypes.func, // Funcția de gestionare a evenimentului trebuie să fie o funcție, dar nu este necesară.
  variant: PropTypes.string, // Variantul poate fi un șir de caractere, dar nu este necesar.
  isDisabled: PropTypes.bool, // Este o valoare booleană, dar nu este necesară.
};

export default ButtonForm;
