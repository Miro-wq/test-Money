import React from 'react';
import { NavLink } from 'react-router-dom';
import sprite from './sprite.svg';
import { useMediaQuery } from 'react-responsive';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <nav className={styles.navStyledContainer}>
      <ul className={styles.navList}>
        <li>
          <NavLink 
            to="/dashboard/home" 
            className={({ isActive }) => isActive ? `${styles.styledNavLink} ${styles.activeNavLink}` : styles.styledNavLink}
          >
            <div>
              <svg width="38" height="38">
                <use href={`${sprite}#homepage`} />
              </svg>
            </div>
            {isDesktopOrLaptop && (
              <span className={styles.styledNavText}>Home</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/statistics" 
            className={({ isActive }) => isActive ? `${styles.styledNavLink} ${styles.activeNavLink}` : styles.styledNavLink}
          >
            <div>
              <svg width="38" height="38">
                <use href={`${sprite}#statistics`} />
              </svg>
            </div>
            {isDesktopOrLaptop && (
              <span className={styles.styledNavText}>Statistics</span>
            )}
          </NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink 
              to="/dashboard/currency" 
              className={({ isActive }) => isActive ? `${styles.styledNavLink} ${styles.activeNavLink}` : styles.styledNavLink}
            >
              <div>
                <svg width="38" height="38">
                  <use href={`${sprite}#dollar`} />
                </svg>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
