import * as React from 'react';
import { useRouter, SingletonRouter } from 'next/router';

type Props = {
  href?: string;
  activeClassName?: string;
  router?: SingletonRouter;
  children: React.ReactNode;
};

const ActiveLink: React.FC<Props> = ({
  href,
  activeClassName,
  router = useRouter(),
  children,
}) => {
  const handleClick = event => {
    event.preventDefault();
    if (href) {
      router.push(href);
    }
  };

  const className =
    ((router && router.pathname) || '/') === href ? activeClassName : '';
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ActiveLink;
