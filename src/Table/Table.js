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
  state = {selections: []};

  constructor(props) {
    super(props);
    this.state = {
      selections: props.selections
    };
    this.columns = props.showSelection ? [this.initCheckboxColumn(this.state.selections), ...props.columns] : props.columns;
  }

  initCheckboxColumn(selections) {
    return {
      title: <Checkbox dataHook="table-select"/>,
      render: (row, rowNum) => <Checkbox
        dataHook="row-select"
        checked={selections[rowNum]}
        onChange={() => {
          const selections = this.state.selections;
          selections[rowNum] = !selections[rowNum];
          this.setState({selections});
          this.dataTable.forceUpdate();
        }}
        />
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
          ref={dataTable => this.dataTable = dataTable}
          />
      </div>
    );
  }
}

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  selections: []
};

Table.propTypes = {
  ...DataTable.propTypes,
  showSelection: PropTypes.bool,
  selections: PropTypes.array
};



