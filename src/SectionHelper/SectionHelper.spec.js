import React from 'react';
import sectionHelperDriverFactory from './SectionHelper.driver';
import {createDriverFactory} from '../test-common';
import SectionHelper from './';
import {sectionHelperTestkitFactory} from '../../testkit';
import {sectionHelperTestkitFactory as enzymeSectionHelperTestkitFactory} from '../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {mount} from 'enzyme';

const renderWithProps = (properties = {}) =>
  <SectionHelper {...properties}>
    {properties.children || <div>Hello, World!</div>}
  </SectionHelper>;

describe('SectionHelper', () => {
  const createDriver = createDriverFactory(sectionHelperDriverFactory);

  it('should render', () => {
    const driver = createDriver(renderWithProps());
    expect(driver.exists()).toBeTruthy();
  });

  it('should render children', () => {
    const driver = createDriver(renderWithProps({children: 'Muffins are the best!'}));
    expect(driver.textContent()).toEqual('Muffins are the best!');
  });

  it('should render title', () => {
    const driver = createDriver(renderWithProps({title: 'Muffins are the best!'}));
    expect(driver.titleText()).toEqual('Muffins are the best!');
  });

  describe('given `actionText` & `onAction` props', () => {
    it('should render button', () => {
      const driver = createDriver(
        renderWithProps({
          actionText: 'Muffins are the best!',
          onAction: () => {}
        }
        ));

      expect(driver.actionText()).toEqual('Muffins are the best!');
    });

    it('should call `onAction` when clicked', () => {
      const onAction = jest.fn();
      const driver = createDriver(renderWithProps({onAction, actionText: 'hello'}));
      driver.clickAction();
      expect(onAction).toBeCalled();
    });
  });


  it('should call `onClose` when close btn clicked', () => {
    const onClose = jest.fn();
    const driver = createDriver(renderWithProps({onClose}));
    driver.clickClose();
    expect(onClose).toBeCalled();
  });

  describe('Themes', () => {
    it('should support standard theme', () => {
      const driver = createDriver(renderWithProps());
      expect(driver.isWarning()).toBeTruthy();
    });

    it('should support standard theme', () => {
      const driver = createDriver(renderWithProps({appearance: 'standard'}));
      expect(driver.isStandard()).toBeTruthy();
    });

    it('should support danger theme', () => {
      const driver = createDriver(renderWithProps({appearance: 'danger'}));
      expect(driver.isDanger()).toBeTruthy();
    });

    it('should support success theme', () => {
      const driver = createDriver(renderWithProps({appearance: 'success'}));
      expect(driver.isSuccess()).toBeTruthy();
    });

    it('should support premium theme', () => {
      const driver = createDriver(renderWithProps({appearance: 'premium'}));
      expect(driver.isPremium()).toBeTruthy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<SectionHelper/>, sectionHelperTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<SectionHelper/>, enzymeSectionHelperTestkitFactory, mount)).toBe(true);
    });
  });
});
