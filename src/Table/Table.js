import React from 'react';
import DataTable from '../DataTable';
import s from './Table.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

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
      selections: props.selections.slice()
    };
    this.columns = props.showSelection ? [this.initCheckboxColumn(props.onSelectionChanged), ...props.columns] : props.columns;
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selections, this.state.selections)) {
      this.setState({selections: nextProps.selections});
      this.dataTable.forceUpdate();
    }
  }

  initCheckboxColumn(onSelectionChanged) {
    return {
      title: <Checkbox dataHook="table-select"/>,
      render: (row, rowNum) => <Checkbox
        dataHook="row-select"
        checked={this.state.selections[rowNum]}
        onChange={() => {
          const selections = this.state.selections;
          selections[rowNum] = !selections[rowNum];
          this.setState({selections});
          this.dataTable.forceUpdate();
          onSelectionChanged && onSelectionChanged(selections);
        }}
        />
    };
  }

  render() {
    const {header, footer, selectionHeader} = this.props;
    const selectionCount = this.state.selections.reduce((total, current) => current ? total + 1 : total, 0);
    return (
      <div>
        {header && !selectionCount && <div className={s.header} data-hook="table-header">
          {typeof header === 'function' ? header() : header}
        </div>}
        {selectionHeader && selectionCount && <div className={s.selectionHeader} data-hook="table-selection-header">
          {typeof selectionHeader === 'function' ? selectionHeader() : selectionHeader}
        </div>}
        <DataTable
          dataHook="table"
          {...this.props}
          columns={this.columns}
          ref={dataTable => this.dataTable = dataTable}
          />
        {footer && <div className={s.footer} data-hook="table-footer">
          {typeof header === 'function' ? footer() : footer}
        </div>}
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
  selections: PropTypes.arrayOf(PropTypes.bool),
  onSelectionChanged: PropTypes.func,
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  selectionHeader: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};



