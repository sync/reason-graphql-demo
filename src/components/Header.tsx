import * as React from 'react';
import css from './Header.css';
import ActiveLink from './ActiveLink';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => (
  <header className={clsx(css.header, className)}>
    <h1>Reddit</h1>
    <nav>
      <ActiveLink href="/" activeClassName={css.active}>
        Home
      </ActiveLink>
    </nav>
  </header>
);

export default Header;
