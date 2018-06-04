import Table from 'wix-style-react/Table';

export default {
  category: '10. Tables',
  storyName: '10.2 Table Card',

  component: Table,
  componentPath: '../../src/Table',

  componentProps: {
    dataHook: 'storybook-table',
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    showSelection: true
  }
};
