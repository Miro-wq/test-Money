import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import styles from './Home.module.css';
import { fetchTransactions } from '../../redux/operations/transactionsOperations';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
import { useMediaQuery } from 'react-responsive';
import { selectAllTransactions } from '../../redux/selectors/transactionsSelector';
import ModalDeleteTransaction from '../../components/ModalDeleteTransaction/ModalDeleteTransaction';
import TransactionsDesktop from '../../components/TransactionsDesktop/TransactionsDesktop';
import Balance from '../../components/Balance/Balance';
import { selectIsAddModalOpen } from '../../redux/Modals/slice';

const Home = () => {
  const dispatch = useDispatch();
  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const data = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <div className={`${styles.HomePage}`}>
        {!screenCondition && <Balance />}

        {screenCondition && (
          <div className={styles.tableContainer}>
            <TransactionsDesktop
              data={data}
              openDeleteModal={() => setIsDeleteModalOpen(true)}
              openEditModal={() => setisEditModalOpen(true)}
            />
          </div>
        )}

        {!screenCondition && (
          <TransactionsList
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
            openEditModal={() => setisEditModalOpen(true)}
          />
        )}

        <ButtonAddTransactions />
      </div>

      <>
        {isAddModalOpen && <ModalAddTransaction />}

        {isDeleteModalOpen && (
          <ModalDeleteTransaction
            closeModal={() => setIsDeleteModalOpen(false)}
          />
        )}

        {isEditModalOpen && (
          <ModalEditTransaction closeModal={() => setisEditModalOpen(false)} />
        )}
      </>
    </>
  );
};

export default Home;
