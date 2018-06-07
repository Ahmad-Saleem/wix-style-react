import React from 'react';
import {object} from 'prop-types';
import {mount} from 'enzyme';
import WixStyleProvider, {withStyles} from './index';

const styles = theme => ({
  color: theme.color
});

const Component = ({theme}) => (
  <div id="component">
    {`My color is ${theme.color}`}
  </div>
);

Component.propTypes = {
  theme: object
};

const WrappedComponent = withStyles(styles, Component);

describe('WixStyleProvider', () => {
  it.skip('should render the wrapped component with the correct props and context', () => {
    const color = 'green';
    const children = `My color is ${color}`;

    const wrapper = mount(
      <WixStyleProvider theme={{color}}>
        <WrappedComponent/>
      </WixStyleProvider>
    );

    expect(wrapper.html()).toBe(`<div id="component">${children}</div>`);
    expect(wrapper.text()).toBe(children);
  });

  it.skip('should have core theme by default', () => {
    const color = 'green';

    const wrapper = mount(
      <WixStyleProvider>
        <WrappedComponent/>
      </WixStyleProvider>
    );

    expect(wrapper.text()).toBe(`Theme is core and color is ${color}`);
  });
});
