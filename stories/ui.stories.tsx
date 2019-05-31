import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/Header.gen';

import './base.css';

storiesOf('Header', module).add('Index', () => {
  return <Header />;
});
