import React from 'react';

import searchDriverFactory from './Search.driver';
import Search from './Search';
import {createDriverFactory} from '../test-common';
import {
  isTestkitExists,
  isEnzymeTestkitExists
} from '../../testkit/test-common';
import {searchTestkitFactory} from '../../testkit';
import {searchTestkitFactory as enzymeSearchTestkitFactory} from '../../testkit/enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';
import {makeControlled} from '../../test/utils';
import {mount} from 'enzyme';

// We use the parent component because the Search component has a wrapper around <InputWithOption />
runInputWithOptionsTest(args => searchDriverFactory({...args, element: args.element ? args.element.parentElement : args.element}));

const options = [
  'The quick',
  'brown',
  'fox',
  'jumps over',
  'the lazy',
  'dog'
].map((value, index) => ({id: index, value}));

describe('Search', () => {
  const createDriver = createDriverFactory(searchDriverFactory);

  describe('Controlled', () => {
    const ControlledSearch = makeControlled(Search);

    it('should show search options if initial value passed and input focused', () => {
      const driver = createDriver(
        <ControlledSearch
          value="the"
          options={options}
          />
      );

      expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
      driver.inputDriver.focus();
      expect(driver.dropdownLayoutDriver.isShown()).toBe(true);
    });

    it('should not show search options when focusing empty input', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          />
      );

      expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
      driver.inputDriver.focus();
      expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
    });

    it('should filter search options if initial input value passed and input focused', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="fox"
          />
      );

      driver.inputDriver.focus();
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
    });

    it('should not treat spaces around search text as part of query', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="  fox  "
          />
      );

      driver.inputDriver.focus();
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
    });

    it('should render required elements of Search box', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          />
      );

      expect(driver.inputDriver.hasPrefix()).toBe(true);
      expect(driver.inputDriver.getPlaceholder()).toBe('Search');
      expect(driver.inputDriver.hasMenuArrow()).toBe(false);
    });

    it('should render clear text button if input is not empty', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="fox"
          />
      );

      expect(driver.inputDriver.hasClearButton()).toBe(true);
    });

    it('should remain focused on Search component after clear button click', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="fox"
          />
      );

      driver.inputDriver.clickClear();
      expect(driver.inputDriver.isFocus()).toBe(true);
    });

    it('should collapse search options after clear button click', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="fox"
          />
      );

      driver.inputDriver.clickClear();
      expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
    });

    it('should do search when text was entered', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          />
      );

      driver.inputDriver.focus();
      driver.inputDriver.enterText('fox');
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
      driver.inputDriver.clearText();
      driver.inputDriver.enterText('the');
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(2);
      driver.inputDriver.clearText();
      driver.inputDriver.enterText('');
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(options.length);
    });

    it('should show no results if nothing was found in options', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          />
      );

      driver.inputDriver.focus();
      driver.inputDriver.enterText('option nowhere to be found');
      expect(driver.dropdownLayoutDriver.optionsLength()).toBe(0);
    });

    // TODO: enhance Input component
    it.skip('should focus search input if click on magnifying glass', () => {
      const driver = createDriver(
        <ControlledSearch
          options={options}
          value="fox"
          />
      );

      driver.inputDriver.clickSuffix();
      expect(driver.inputDriver.isFocus()).toBe(true);
    });

    it('should highlight the matched options text', () => {
      const driver = createDriver(
        <ControlledSearch
          value="the"
          options={options}
          />
      );

      expect(driver.dropdownLayoutDriver.optionAt(0).querySelector('strong').textContent).toContain('The');
    });
  });

  describe('Uncontrolled', () => {
    it('should filter search options if initial defaultValue value passed and input focused', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver(
        <Search
          options={options}
          defaultValue="fox"
          />
      );

      inputDriver.focus();
      expect(dropdownLayoutDriver.optionsLength()).toBe(1);
    });
  });

  describe('Expandable', () => {
    it('should start as collapsed element by default when expndable=true', () => {
      const {driver} = createDriver(
        <Search options={options} expandable/>
      );

      expect(driver.isExpandable()).toBeTruthy();
      expect(driver.isCollapsed()).toBeTruthy();
    });

    it('should extend the search input when clicked', () => {
      const {driver, inputDriver} = createDriver(
        <Search options={options} expandable/>
      );

      expect(driver.isCollapsed()).toBeTruthy();
      inputDriver.click();
      expect(driver.isCollapsed()).toBeFalsy();
    });

    it('should be focused on the input after expanding the search component', () => {
      const {inputDriver} = createDriver(
        <Search options={options} expandable/>
      );

      expect(inputDriver.isFocus()).toBeFalsy();
      inputDriver.click();
      expect(inputDriver.isFocus()).toBeTruthy();
    });

    it('should not collapse the input if the input has no value and blurred', () => {
      const {inputDriver, driver} = createDriver(
        <Search options={options} expandable/>
      );

      inputDriver.click();
      inputDriver.enterText('wix');
      inputDriver.blur();
      expect(driver.isCollapsed()).toBeFalsy();
    });

    it('should collapse the input if the input has no value and blurred', () => {
      const {inputDriver, driver} = createDriver(
        <Search options={options} expandable/>
      );

      inputDriver.click();
      inputDriver.blur();
      expect(driver.isCollapsed()).toBeTruthy();
    });

    it('should have non-collapsed input when expandaple=true and the input has initial value', () => {
      const {driver} = createDriver(
        <Search options={options} expandable defaultValue={'Test'}/>
      );

      expect(driver.isExpandable()).toBeTruthy();
      expect(driver.isCollapsed()).toBeFalsy();
    });

    it('should not be collapsed by default', () => {
      const {driver, inputDriver} = createDriver(
        <Search options={options}/>
      );

      expect(driver.isExpandable()).toBeFalsy();
      expect(driver.isCollapsed()).toBeFalsy();
      inputDriver.click();
      expect(driver.isCollapsed()).toBeFalsy();
    });
    it('should not be collapsed when specified with autoFocus', () => {
      const {driver} = createDriver(
        <Search expandable autoFocus options={options}/>
      );

      expect(driver.isExpandable()).toBeTruthy();
      expect(driver.isCollapsed()).toBeFalsy();
    });
  });
});

describe('Testkits', () => {
  it('Using ReactTestUtils testkit', () => {
    expect(isTestkitExists(<Search options={options}/>, searchTestkitFactory)).toBe(true);
  });

  it('Using Enzyme testkit', () => {
    expect(isEnzymeTestkitExists(<Search options={options}/>, enzymeSearchTestkitFactory, mount)).toBe(true);
  });
});
