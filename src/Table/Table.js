import React from 'react';
import DataTable from '../DataTable';
//import s from './Table.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox';
import PropTypes from 'prop-types';

/**
 * Search component with suggestions based on input value listed in dropdown
 */
export default class Table extends WixComponent {
  static displayName = 'Table';
  columns;

  constructor(props) {
    super(props);
    this.columns = props.showSelection ? [this.initCheckboxColumn(), ...props.columns] : props.columns;
  }

  initCheckboxColumn() {
    return {
      title: <Checkbox dataHook="table-select"/>,
      render: () => <Checkbox dataHook="row-select"/>
    };
  }

  render() {
    return (
      <div>
        <div>{'Card Table'}</div>
        <DataTable
          dataHook="table"
          {...this.props}
          columns={this.columns}
          />
      </div>
    );
  }
}

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false
};

Table.propTypes = {
  ...DataTable.propTypes,
  showSelection: PropTypes.bool
};



