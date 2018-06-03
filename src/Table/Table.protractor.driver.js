
const tableDriverFactory = component => ({
  getTable: () => component.$$('table').count(),
  element: () => component
});

export default tableDriverFactory;

