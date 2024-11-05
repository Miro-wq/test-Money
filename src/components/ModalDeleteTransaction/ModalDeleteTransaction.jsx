import styles from './ModalDeleteTransaction.module.css';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

import Logo from 'components/Logo/Logo';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../redux/operations/transactionsOperations';
import { selectTrasactionIdForDelete } from '../../redux/selectors/transactionsSelector';
import { getUserInfo } from '../../redux/operations/authOperations';
import ButtonForm from 'components/ButtonForm/ButtonForm';

const ModalDeleteTransaction = ({ closeModal }) => {
  const dispatch = useDispatch();

  const trasactionIdForDelete = useSelector(selectTrasactionIdForDelete);

  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', addCloseEvent);
    };
  });

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && closeModal();
  };

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  const handleDeleteClick = () => [
    dispatch(deleteTransaction(trasactionIdForDelete))
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getUserInfo());
      })
      .catch(error => {
        console.log(error);
      }),
  ];

  return (
    <div
      className={styles.deleteModal}
      onClick={closeOnClickOutside}
      ref={modalRef}
    >
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && <Logo variant={'formLogo'} />}

          <p>Are you sure you want to detete this transaction?</p>

          <div className={styles.buttonsWrapper}>
            <ButtonForm
              type={'button'}
              text={'Delete'}
              variant={'multiColorButtton'}
              handlerFunction={handleDeleteClick}
            />
            <ButtonForm
              type={'button'}
              text={'cancel'}
              variant={'whiteButtton'}
              handlerFunction={() => closeModal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ModalDeleteTransaction.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalDeleteTransaction;
