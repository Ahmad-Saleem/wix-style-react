// import ReactTestUtils from "react-dom/test-utils";
// import ReactDOM from "react-dom";
import dataTableDriverFactory from '../DataTable/DataTable.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';

const tableDriverFactory = ({element, wrapper, component, eventTrigger}) => {
  const dataTableDriver = dataTableDriverFactory({element, wrapper, component});
  return {
    ...dataTableDriver,
    getRowCheckboxDriver: index => checkboxDriverFactory({
      element: dataTableDriver.getCell(index, 0).querySelectorAll('[data-hook="row-select"]'),
      eventTrigger
    }),
    getTableCheckboxDriver: () => checkboxDriverFactory({
      element: dataTableDriver.getHeaderTitleByIndex(0).querySelectorAll('[data-hook="table-select"]'),
      eventTrigger
    })
  };
};

export default tableDriverFactory;

