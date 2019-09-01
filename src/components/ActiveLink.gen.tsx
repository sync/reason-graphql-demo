/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const ActiveLinkBS = require('./ActiveLink.bs');

import {Router_t as Next_Router_t} from '../../src/shims/Next.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly activeClassName: string; 
  readonly children: React.ReactChild; 
  readonly href: string; 
  readonly router?: (null | undefined | Next_Router_t)
};

export const $$default: React.ComponentType<{
  readonly activeClassName: string; 
  readonly children: React.ReactChild; 
  readonly href: string; 
  readonly router?: (null | undefined | Next_Router_t)
}> = function ActiveLink(Arg1: any) {
  const result = ActiveLinkBS.default({activeClassName:Arg1.activeClassName, children:Arg1.children, href:Arg1.href, router:(Arg1.router == null ? undefined : (Arg1.router == null ? undefined : Arg1.router))});
  return result
};

export default $$default;
