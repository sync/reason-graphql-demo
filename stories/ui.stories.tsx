import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/Header.gen';
import ActiveLink from '../src/components/ActiveLink.gen';

import './base.css';

storiesOf('Header', module).add('Default', () => {
  return <Header />;
});

storiesOf('ActiveLink', module)
  .add('When Active', () => {
    return (
      <ActiveLink href="/" activeClassName={'test-active'}>
        <span>{'Active Link'}</span>
      </ActiveLink>
    );
  })
  .add('When Inactive', () => {
    return (
      <ActiveLink href="/something" activeClassName={'test-active'}>
        <span>{'Inactive Link'}</span>
      </ActiveLink>
    );
  });
