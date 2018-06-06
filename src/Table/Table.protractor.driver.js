
const tableDriverFactory = component => ({
  getTable: () => component.$('table'),
  element: () => component
});

export default tableDriverFactory;

