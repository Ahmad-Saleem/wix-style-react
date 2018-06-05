import React from 'react';
import Table from 'wix-style-react/Table';
import {Row, Col} from 'wix-style-react/Grid';
import Heading from 'wix-style-react/Heading';
import Label from 'wix-style-react/Label';
import InputWithOptions from 'wix-style-react/InputWithOptions';
import Search from 'wix-style-react/Search';

const defaultHeader = (
  <div>
    <Row>
      <Col span={4}><Heading appearance={'H2'}>Title</Heading></Col>
      <Col span={5}>
        <Label>Filter By</Label>
        <InputWithOptions
          width={50}
          options={[
            {id: 0, value: 'All'},
            {id: 1, value: 'Red'}]}
          />
      </Col>
      <Col span={3}>
        <Search

          options={[
            {
              id: 0,
              value: 'Red'
            },
            {
              id: 1,
              value: 'Green'
            }
          ]}
          />
      </Col>
    </Row>
  </div>);
export default {
  category: '10. Tables',
  storyName: '10.2 Table Card',

  component: Table,
  componentPath: '../../src/Table',

  componentProps: {
    dataHook: 'storybook-table',
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    selections: [true, false],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    showSelection: true,
    header: defaultHeader
  }
};
