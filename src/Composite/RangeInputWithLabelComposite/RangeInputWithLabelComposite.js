import React, {Children} from 'react';
import * as PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './RangeInputWithLabelComposite.scss';
import classNames from 'classnames';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class RangeInputWithLabelComposite extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasFocusFirst: false,
      hasFocusLast: false
    };
  }

  _doKeyDown(e) {
    const keys = {
      upArrow: 38,
      downArrow: 40
    };
    if (e.keyCode === keys.upArrow && !isNaN(e.target.value)) {
      e.preventDefault();
      e.target.value++;
    }
    if (e.keyCode === keys.downArrow && !isNaN(e.target.value)) {
      e.preventDefault();
      e.target.value--;
    }
  }

  _handleFocusFirst() {
    this.setState({hasFocusFirst: true});
  }

  _handleBlurFirst() {
    this.setState({hasFocusFirst: false});
  }

  _handleFocusLast() {
    this.setState({hasFocusLast: true});
  }

  _handleBlurLast() {
    this.setState({hasFocusLast: false});
  }

  render() {
    const children = Children.toArray(this.props.children);
    const rangeType = this.props.children[1].type.displayName;
    const label = children.length === 3 ? (
      <div className={styles.label}>
        {children[0]}
        { this.props.required || this.props.info || this.props.tooltip ?
          <FieldLabelAttributes required={this.props.required} info={this.props.info} tooltip={this.props.tooltip}/> : null }
      </div>) : null;
    const firstInput = children.length === 3 ? children[1] : children[0];
    const lastInput = children.length === 3 ? children[2] : children[1];

    const additionalFirstInputProps = {
      className: (rangeType === 'DatePicker') ? styles.firstDate : styles.firstinput,
      noRightBorderRadius: true,
      onKeyDown: e => this._doKeyDown(e),
      onFocus: e => this._handleFocusFirst(e),
      onBlur: e => this._handleBlurFirst(e)
    };

    const additionalLastInputProps = {
      className: (rangeType === 'DatePicker') ? styles.lastDate : styles.lastinput,
      noLeftBorderRadius: true,
      onKeyDown: e => this._doKeyDown(e),
      onFocus: e => this._handleFocusLast(e),
      onBlur: e => this._handleBlurLast(e)
    };

    const inputWrapperClassNames = classNames({
      [styles.hasFocusFirst]: this.state.hasFocusFirst,
      [styles.hasFocusLast]: this.state.hasFocusLast,
      [styles.inputs]: true
    });

    return (<div className={styles.wrapper}>
      {label}
      <div className={inputWrapperClassNames}>
        { React.cloneElement(firstInput, rangeType === 'DatePicker' ? {inputProps: additionalFirstInputProps} : additionalFirstInputProps)}
        { React.cloneElement(lastInput, rangeType === 'DatePicker' ? {inputProps: additionalLastInputProps} : additionalLastInputProps)}
      </div>
    </div>);
  }
}

RangeInputWithLabelComposite.propTypes = {
  ...WixComponent.propTypes,
  children: PropTypes.any,
  required: PropTypes.bool,
  info: PropTypes.string
};

RangeInputWithLabelComposite.displayName = 'RangeInputWithLabelComposite';

export default RangeInputWithLabelComposite;
