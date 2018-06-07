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
  static checkboxState;
  columns;
  state = {selections: []};

  constructor(props) {
    super(props);
    this.checkboxState = {
      checked: 'checked',
      unchecked: 'unchecked',
      indeterminate: 'indeterminate'
    };
    const selections = props.selections.slice();
    this.state = {
      selections,
      data: props.data.slice(),
      tableCheckbox: this.getNextCheckboxState(selections)
    };
    this.columns = props.showSelection ? [this.initCheckboxColumn(props.onSelectionChanged), ...props.columns] : props.columns;
  }

  getSelectionsCount(selections) {
    return selections.reduce((total, current) => current ? total + 1 : total, 0);
  }

  getNextCheckboxState(selections) {
    const numOfSelected = this.getSelectionsCount(selections);
    const numOfRows = selections.length;
    return numOfSelected === 0 ? this.checkboxState.unchecked :
      numOfSelected === numOfRows ? this.checkboxState.checked : this.checkboxState.indeterminate;
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (!isEqual(nextProps.selections, this.state.selections)) {
      newState.selections = nextProps.selections;
    }

    if (!isEqual(nextProps.data, this.props.data)) {
      newState.data = nextProps.data;
    }

    if (newState) {
      this.setState(newState);
      this.dataTable.forceUpdate();
    }
  }

  toggleAll(enable) {
    return this.state.selections.map(() => enable);
  }

  initCheckboxColumn(onSelectionChanged) {
    return {
      title: () => <Checkbox
        dataHook="table-select"
        checked={this.state.tableCheckbox === this.checkboxState.checked}
        indeterminate={this.state.tableCheckbox === this.checkboxState.indeterminate}
        onChange={() => {
          if (this.state.tableCheckbox === this.checkboxState.indeterminate) {
            const selections = this.toggleAll(true);
            this.setState({selections, tableCheckbox: this.checkboxState.checked});
          } else if (this.state.tableCheckbox === this.checkboxState.checked) {
            const selections = this.toggleAll(false);
            this.setState({selections, tableCheckbox: this.checkboxState.unchecked});
          } else {
            const selections = this.toggleAll(true);
            this.setState({selections, tableCheckbox: this.checkboxState.checked});
          }
          this.dataTable.forceUpdate();
        }}
        />,
      render: (row, rowNum) => <Checkbox
        dataHook="row-select"
        checked={this.state.selections[rowNum]}
        onChange={() => {
          const selections = this.state.selections;
          selections[rowNum] = !selections[rowNum];
          this.setState({selections, tableCheckbox: this.getNextCheckboxState(selections)});
          this.dataTable.forceUpdate();
          onSelectionChanged && onSelectionChanged(selections);
        }}
        />
    };
  }

  render() {
    const {header, footer, selectionHeader} = this.props;
    const selectionCount = this.getSelectionsCount(this.state.selections);
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
          data={this.state.data}
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
  /** Identify if to show selection column */
  showSelection: PropTypes.bool,
  /** Array of rows selections values */
  selections: PropTypes.arrayOf(PropTypes.bool),
  /** Will run when row checkbox click. Receive the updated selection array */
  onSelectionChanged: PropTypes.func,
  /** The header that appear above the table */
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /** The header that appear above the table when there is selected rows */
  selectionHeader: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /** The footer that appear below the table */
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};



