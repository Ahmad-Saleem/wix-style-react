import React from 'react';
import PropTypes from 'prop-types';

import InputWithOptions from '../InputWithOptions';
import SearchIcon from 'wix-ui-icons-common/Search';
import WixComponent from '../BaseComponents/WixComponent';

import styles from './Search.scss';
import classNames from 'classnames';


/**
 * Search component with suggestions based on input value listed in dropdown
 */
export default class Search extends WixComponent {
  static displayName = 'Search';

  static propTypes = {
    ...InputWithOptions.propTypes,
    placeholder: PropTypes.string,
    expandable: PropTypes.bool
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    placeholder: 'Search',
    expandable: false
  };

  constructor(props) {
    super(props);

    this.state = {
      inputValue: (!this._isControlled && props.defaultValue) || '',
      collapsed: true
    };
  }

  get _isControlled() {
    return 'value' in this.props && 'onChange' in this.props;
  }

  get _filteredOptions() {
    const {
      options,
      value
    } = this.props;

    const searchText = this._isControlled ? value : this.state.inputValue;

    return options.filter(option => (searchText && searchText.length) ?
      new RegExp(searchText.trim(), 'i').test(option.value) :
      true
    );
  }

  _onChange = e => {
    if (this._isControlled) {
      this.props.onChange(e);
    } else {
      this.setState({
        inputValue: e.target.value
      });
    }
  };

  _onClear = () => {
    const {
      onClear
    } = this.props;

    this.refs.searchInput.input.blur();

    if (!this.state.collapsed && this.props.expandable) {
      this.setState({
        collapsed: true
      });
    }

    onClear && onClear();
  };

  _onBlur = () => {
    const {
      onBlur
    } = this.props;

    if (!this.state.collapsed && this.props.expandable) {
      let value;

      if (this._isControlled) {
        value = this.props.value;
      } else {
        value = this.state.inputValue;
      }

      if (value === '') {
        this.setState({
          collapsed: true
        });
      }
    }

    onBlur && onBlur();
  };

  _onWrapperClick = () => {
    if (this.props.expandable && this.state.collapsed) {
      this.setState({ collapsed: false });
      this.refs.searchInput.input.focus();
    }
  };

  render() {
    const wrapperClasses = classNames({
      [styles.expandableStyles]: true,
      [styles.collapsed]: this.state.collapsed && this.props.expandable,
      [styles.expanded]: !this.state.collapsed && this.props.expandable
    });

    return (
      <InputWithOptions
        {...this.props}
        ref="searchInput"
        roundInput
        prefix={<div className={styles.leftIcon}><SearchIcon/></div>}
        menuArrow={false}
        clearButton
        closeOnSelect
        showOptionsIfEmptyInput={false}
        options={this._filteredOptions}
        onClear={this._onClear}
        onChange={this._onChange}
        onBlur={this._onBlur}
        highlight/>
    );
  }
}
