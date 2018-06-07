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
  const dataHook = 'someDataHook';
  const createEnzymeDriver = component => {
    const wrapper = mount(component);
    const driver = enzymeTableTestkitFactory({wrapper, dataHook});
    return {driver, wrapper};
  };
  const defaultProps = {
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name'
  };
  const withSelection = {
    selections: [true, false],
    showSelection: true
  };
  const defaultHeader = (<div>Header</div>);
  const renderHeader = () => defaultHeader;
  const defaultFooter = (<div>Footer</div>);
  const renderFooter = () => defaultHeader;

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  it('should display checkboxes if showSelection is true', () => {
    const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
    expect(driver.isRowCheckboxVisible(1)).toBeTruthy();
    expect(driver.isTableCheckboxVisible()).toBeTruthy();
  });

  it('shouldn\'t display checkboxes if showSelection is false', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.isRowCheckboxVisible(1)).toBeFalsy();
    expect(driver.isTableCheckboxVisible()).toBeFalsy();
  });

  it('should check rows checkboxes according to selection prop', () => {
    const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
    expect(driver.isRowSelected(0)).toBeTruthy();
    expect(driver.isRowSelected(1)).toBeFalsy();
  });

  it('should change selection when user selection changed', () => {
    const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
    driver.selectRow(1);
    expect(driver.isRowSelected(1)).toBeTruthy();
  });

  it('should call onSelectionChanged with correct selection when checkbox clicked', () => {
    const onSelectionChanged = jest.fn();
    const driver = createDriver(<Table {...defaultProps} {...withSelection} onSelectionChanged={onSelectionChanged}/>);
    driver.selectRow(1);
    expect(onSelectionChanged).toHaveBeenCalledWith([true, true]);
  });

  it('should update selection if selection prop has change', async () => {
    const selections = [false, false];
    const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selections={selections} showSelection dataHook={dataHook}/>);
    selections[0] = true;
    wrapper.setProps({selections});
    expect(driver.isRowSelected(0)).toBeTruthy();
  });

  it('should rerender on data update', () => {
    const props = {
      id: 'id',
      columns: [
        {title: 'Row Num', render: (row, rowNum) => rowNum},
        {title: 'A', render: row => row.a},
        {title: 'B', render: row => row.b}
      ],
      rowClass: 'class-name'
    };
    const data = [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}];
    const {driver, wrapper} = createEnzymeDriver(<Table {...props} data={data} dataHook={dataHook}/>);
    const newValue = 'value 1 changed';
    data[0].a = newValue;
    wrapper.setProps({data});
    expect(driver.getCell(0, 1).innerHTML).toEqual(newValue);
  });

  describe('Top checkbox', () => {
    it('should display as checked when all rows are selected', () => {
      const selections = [true, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      expect(driver.isTableCheckboxSelected()).toBeTruthy();
      expect(driver.isTableCheckboxIndeterminate()).toBeFalsy();
    });

    it('should display as unchecked when no rows are selected', () => {
      const selections = [false, false];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      expect(driver.isTableCheckboxSelected()).toBeFalsy();
      expect(driver.isTableCheckboxIndeterminate()).toBeFalsy();
    });

    it('should display as partial when some rows are selected', () => {
      const selections = [false, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      expect(driver.isTableCheckboxIndeterminate()).toBeTruthy();
    });

    it('should select all rows when top checkbox clicked and no checkboxes are checked', () => {
      const selections = [false, false];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectTableRow();
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeTruthy();
    });

    it('should select all rows when top checkbox clicked and some checkboxes are checked', () => {
      const selections = [false, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectTableRow();
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeTruthy();
    });

    it('should unselect all rows when top checkbox clicked and all checkboxes are checked', () => {
      const selections = [true, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectTableRow();
      expect(driver.isRowSelected(0)).toBeFalsy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should call onSelectionChanged when top checkbox clicked and no checkboxes are checked with correct selection', () => {
      // const onSelectionChanged = jest.fn();
      // const driver = createDriver(<Table {...defaultProps} {...withSelection} onSelectionChanged={onSelectionChanged}/>);
      // driver.selectRow(1);
      // expect(onSelectionChanged).toHaveBeenCalledWith([true, true]);
    });

    it('should call onSelectionChanged when top checkbox clicked and some checkboxes are checked with correct selection', () => {
    });

    it('should call onSelectionChanged when top checkbox clicked and all checkboxes are checked with correct selection', () => {
    });

    it('should check top checkbox when all rows change to check', () => {
      const selections = [false, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectRow(0);
      expect(driver.isTableCheckboxSelected()).toBeTruthy();
      expect(driver.isTableCheckboxIndeterminate()).toBeFalsy();
    });

    it('should uncheck top checkbox when all rows change to uncheck', () => {
      const selections = [false, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectRow(1);
      expect(driver.isTableCheckboxSelected()).toBeFalsy();
      expect(driver.isTableCheckboxIndeterminate()).toBeFalsy();
    });

    it('should show partial in top checkbox when uncheck row if all rows where check', () => {
      const selections = [true, true];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectRow(1);
      expect(driver.isTableCheckboxIndeterminate()).toBeTruthy();
    });

    it('should show partial in top checkbox when check row if all rows where uncheck', () => {
      const selections = [false, false];
      const driver = createDriver(<Table {...defaultProps} selections={selections} showSelection/>);
      driver.selectRow(1);
      expect(driver.isTableCheckboxIndeterminate()).toBeTruthy();
    });
  });

  it('should render Header node', () => {
    const driver = createDriver(
      <Table
        {...defaultProps}
        showSelection
        header={defaultHeader}
        selections={[false, false]}
        />);
    expect(driver.isHeaderDisplayed()).toBeTruthy();
    expect(driver.isSelectionHeaderDisplayed()).toBeFalsy();
  });

  it('should render Header function', () => {
    const driver = createDriver(
      <Table
        {...defaultProps}
        showSelection
        header={renderHeader}
        selections={[false, false]}
        />);
    expect(driver.isHeaderDisplayed()).toBeTruthy();
    expect(driver.isSelectionHeaderDisplayed()).toBeFalsy();
  });

  it('should render Footer node', () => {
    const driver = createDriver(<Table {...defaultProps} showSelection footer={defaultFooter}/>);
    expect(driver.isFooterDisplayed()).toBeTruthy();
  });

  it('should render Footer function', () => {
    const driver = createDriver(<Table {...defaultProps} showSelection footer={renderFooter}/>);
    expect(driver.isFooterDisplayed()).toBeTruthy();
  });

  describe('seletionHeader', () => {
    it('should change from header to selectionHeader when selection introduced', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          selections={[false, false]}
          showSelection
          header={defaultHeader}
          selectionHeader={defaultHeader}
          />);
      expect(driver.isHeaderDisplayed()).toBeTruthy();
      expect(driver.isSelectionHeaderDisplayed()).toBeFalsy();
      driver.selectRow(0);
      expect(driver.isHeaderDisplayed()).toBeFalsy();
      expect(driver.isSelectionHeaderDisplayed()).toBeTruthy();
    });

    it('should change from selectionHeader to header when selection removed', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          selections={[true, false]}
          showSelection
          header={defaultHeader}
          selectionHeader={defaultHeader}
          />);
      expect(driver.isHeaderDisplayed()).toBeFalsy();
      expect(driver.isSelectionHeaderDisplayed()).toBeTruthy();
      driver.selectRow(0);
      expect(driver.isHeaderDisplayed()).toBeTruthy();
      expect(driver.isSelectionHeaderDisplayed()).toBeFalsy();
    });

    it('should display number of selected rows in title', () => {
    });
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
