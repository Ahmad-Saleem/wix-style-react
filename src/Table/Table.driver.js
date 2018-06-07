import dataTableDriverFactory from '../DataTable/DataTable.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';

const tableDriverFactory = ({element, wrapper, component, eventTrigger}) => {
  const dataTableDriver = dataTableDriverFactory({element, wrapper, component});

  const getHeader = () => element.querySelector('[data-hook="table-header"]');
  const getSelectionHeader = () => element.querySelector('[data-hook="table-selection-header"]');
  const getFooter = () => element.querySelector('[data-hook="table-footer"]');
  const getRowCheckboxDriver = index => checkboxDriverFactory({
    element: dataTableDriver.getCell(index, 0).querySelector('[data-hook="row-select"]'),
    eventTrigger
  });
  const getTableCheckboxDriver = () => checkboxDriverFactory({
    element: dataTableDriver.getHeaderTitleByIndex(0).querySelector('[data-hook="table-select"]'),
    eventTrigger
  });
  return {
    ...dataTableDriver,
    selectRow: index => getRowCheckboxDriver(index).click(),
    isRowCheckboxVisible: index => getRowCheckboxDriver(index).exists(),
    isTableCheckboxVisible: () => getTableCheckboxDriver().exists(),
    isRowSelected: index => getRowCheckboxDriver(index).isChecked(),
    isTableCheckboxSelected: () => getTableCheckboxDriver().isChecked(),
    isTableCheckboxIndeterminate: () => getTableCheckboxDriver().isIndeterminate(),
    isHeaderDisplayed: () => !!getHeader(),
    isSelectionHeaderDisplayed: () => !!getSelectionHeader(),
    isFooterDisplayed: () => !!getFooter()
  };
};

export default tableDriverFactory;

