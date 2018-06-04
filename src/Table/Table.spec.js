import TableDriverFactory from './table.driver';
import React from 'react';
import Table from './Table';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from '../test-common';
import {tableTestkitFactory} from '../../testkit';
import {tableTestkitFactory as enzymeTableTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Table', () => {
  const createDriver = createDriverFactory(TableDriverFactory);

  const defaultProps = {
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    selections: [true, false],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name'
  };

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  it('should display checkboxes if showSelection is true', () => {
    const driver = createDriver(<Table {...defaultProps} showSelection/>);
    expect(driver.getRowCheckboxDriver(1).exists()).toBeTruthy();
    expect(driver.getTableCheckboxDriver().exists()).toBeTruthy();
  });

  it('shouldn\'t display checkboxes if showSelection is false', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.getRowCheckboxDriver(1).exists()).toBeFalsy();
    expect(driver.getTableCheckboxDriver().exists()).toBeFalsy();
  });

  it('should check rows checkboxes according to selection prop', () => {
    const driver = createDriver(<Table {...defaultProps} showSelection/>);
    expect(driver.getRowCheckboxDriver(0).isChecked()).toBeTruthy();
    expect(driver.getRowCheckboxDriver(1).isChecked()).toBeFalsy();
  });

  it('should change selection when user selection changed', () => {});
  it('should call onSelectionChanged with correct selection when checkbox clicked', () => {});
  it('should rerender on data update', () => {});
  describe('Top checkbox', () => {
    it('should display as checked when all rows are selected', () => {});
    it('should display as unchecked when no rows are selected', () => {});
    it('should display as partial when some rows are selected', () => {});
    it('should select all row when clicked and no checkboxes are checked', () => {});
    it('should select all row when clicked and some checkboxes are checked', () => {});
    it('should unselect all row when clicked and all checkboxes are checked', () => {});
    it('should call onSelectionChanged when clicked and no checkboxes are checked with correct selection', () => {});
    it('should call onSelectionChanged when clicked and some checkboxes are checked with correct selection', () => {});
    it('should call onSelectionChanged when clicked and all checkboxes are checked with correct selection', () => {});
  });
  it('should render Header', () => {});
  it('should render Footer', () => {});
  describe('Bulk Action Header', () => {
    it('should render if some rows are checked', () => {});
    it('should display nuber of selected rows in title', () => {});
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>
        <Table
          dataHook={dataHook}
          {...defaultProps}
          />
      </div>));
      const dataTableTestkit = tableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Table {...defaultProps} dataHook={dataHook}/>);
      const dataTableTestkit = enzymeTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });
});
