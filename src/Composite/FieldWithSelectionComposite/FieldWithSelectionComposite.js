import React, {Children} from 'react';
import {any} from 'prop-types';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import styles from './FieldWithSelectionComposite.scss';
import classNames from 'classnames';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class FieldWithSelectionComposite extends WixComponent {
  constructor(props) {
    super(props);
    this._onFocusFirst = this._onFocusFirst.bind(this);
    this._onBlurFirst = this._onBlurFirst.bind(this);
    this._onFocusLast = this._onFocusLast.bind(this);
    this._onBlurLast = this._onBlurLast.bind(this);

    this.state = {
      hasFocusFirst: false,
      hasFocusLast: false
    };
  }

  getPrototypeDisplayName(selectionInput) {
    const type = Object.getPrototypeOf(selectionInput.type);
    return type && type.displayName;
  }

  getDisplayName(selectionInput) {
    return selectionInput.type.displayName || this.getPrototypeDisplayName(selectionInput);
  }

  _getTextInput() {
    return (this.props.children.length === 3) ? this.props.children[1] : this.props.children[0];
  }

  _onFocusFirst() {
    this.setState({hasFocusFirst: true});
  }

  _onBlurFirst(e) {
    const textInput = this._getTextInput();
    this.setState({hasFocusFirst: false}, () => {
      textInput.props.onBlur && textInput.props.onBlur(e);
    });
  }

  _onFocusLast() {
    this.setState({hasFocusLast: true});
  }

  _onBlurLast() {
    this.setState({hasFocusLast: false});
  }

  withBorderWrapper(checkboxSelectionInput) {
    const checkboxWrapperClassNames = {[styles.borderWrapper]: true};
    checkboxWrapperClassNames[styles.error] = this.props.error;
    checkboxWrapperClassNames[styles.disabled] = this.props.disabled;
    return (
      <div className={classNames(checkboxWrapperClassNames)}>
        {checkboxSelectionInput}
      </div>
    );
  }

  cloneSelectionInput(selectionInput, selectionInputType) {
    const isCheckbox = selectionInputType === 'Checkbox';
    const errorPropName = isCheckbox ? 'hasError' : 'error';

    const clonedSelectionInput = React.cloneElement(selectionInput, {
      noLeftBorderRadius: true,
      disabled: this.props.disabled,
      [errorPropName]: this.props.error,
      onFocus: this._onFocusLast,
      onBlur: this._onBlurLast
    });

    return isCheckbox ?
        this.withBorderWrapper(clonedSelectionInput) : clonedSelectionInput;
  }

  getSelectionInputType(selectionInputChild) {
    let type = this.getDisplayName(selectionInputChild);
    // HACK to handle withFocusable(Checkbox)
    if (type.includes('Checkbox')) {
      type = 'Checkbox';
    }
    return type;
  }

  render() {
    const children = Children.toArray(this.props.children);
    const label = children.length === 3 ? (
      <div className={styles.label}>
        {children[0]}
        { this.props.required || this.props.info || this.props.tooltip ?
          <FieldLabelAttributes required={this.props.required} info={this.props.info} tooltip={this.props.tooltip}/> : null }</div>) : null;
    const textInput = this._getTextInput();
    const originalSelectionInput = label ? children[2] : children[1];
    const inputsWrapperClassNames = {[styles.inputs]: true};
    const selectionInputType = this.getSelectionInputType(originalSelectionInput);

    if (selectionInputType) {
      inputsWrapperClassNames[styles[selectionInputType.toLowerCase()]] = true;
    }

    inputsWrapperClassNames[styles.hasFocusFirst] = this.state.hasFocusFirst;
    inputsWrapperClassNames[styles.hasFocusLast] = this.state.hasFocusLast;
    inputsWrapperClassNames[styles.error] = this.props.error;
    inputsWrapperClassNames[styles.disabled] = this.props.disabled;

    return (
      <div className={styles.wrapper} >
        {label}
        <div className={classNames(inputsWrapperClassNames)} data-hook="input-wrappers">
          {React.cloneElement(textInput, {
            noRightBorderRadius: true,
            onFocus: this._onFocusFirst,
            onBlur: this._onBlurFirst,
            error: this.props.error,
            disabled: this.props.disabled,
            withSelection: true
          })}
          {this.cloneSelectionInput(originalSelectionInput, selectionInputType)}
        </div>
      </div>
    );
  }
}

FieldWithSelectionComposite.propTypes = {
  children: any
};

FieldWithSelectionComposite.displayName = 'FieldWithSelectionComposite';

export default FieldWithSelectionComposite;
