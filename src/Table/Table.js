import React from 'react';
import DataTable from '../DataTable';
import s from './Table.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Card from '../Card/Card';

/**
 * Search component with suggestions based on input value listed in dropdown
 */
export default class Table extends WixComponent {
  static displayName = 'Table';

  render() {
    return (
      <Card>
        <Card.Header title={'Card Table'}/>
        <DataTable
          dataHook="table"
          {...this.props}
          />
      </Card>
    );
  }
}

Table.defaultProps = {
  ...DataTable.defaultProps
};

Table.propTypes = {
  ...DataTable.propTypes
};



