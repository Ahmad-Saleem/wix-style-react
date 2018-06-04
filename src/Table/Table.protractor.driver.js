
const tableDriverFactory = component => ({
  getTable: () => component.$$('table'),
  isTableVisible: () => component.$('table').isPresent(),
  element: () => component
});

export default tableDriverFactory;

