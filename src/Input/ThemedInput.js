import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Typography from '../Typography';

import styles from './Input.scss';

class ThemedInput extends Input {
  render() {
    const {
      id,
      size,
      dataHook,
      title,
      theme,
      rtl,
      disabled,
      error,
      forceHover,
      forceFocus,
      roundInput,
      className,
      noLeftBorderRadius,
      noRightBorderRadius,
      value,
      withSelection
    } = this.props;

    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.roundInput]: roundInput,
      [styles.hasValue]: (value && value.length) || (this.input && !!this.input.value),
      [styles.noRightBorderRadius]: noRightBorderRadius === true, // assert boolean type
      [styles.noLeftBorderRadius]: noLeftBorderRadius === true // assert boolean type
    };

    /* Adding [noRightBorderRadius] as a string className, is a hack for backward compatibility with
     * a bug that existed in WSR version <= 4.1.0. This should be removed in version 5.x.x.
     */
    if (typeof noRightBorderRadius === 'string') {

      classes[noRightBorderRadius] = true;
    }
    if (typeof noLeftBorderRadius === 'string') {
      classes[noLeftBorderRadius] = true;
    }

    const placeholder = this.props.placeholder;
    return (
      <div
        className={classNames(classes, styles.root, styles[`theme-${theme}`], styles[`size-${size}${withSelection ? '-with-selection' : ''}`], className)}
        data-hook={dataHook}
        >
        {(theme === 'amaterial') &&
        <label className={classNames(styles.materialTitle, Typography.t1_1)} htmlFor={id}>{title}</label>}
        {super.render({placeholder})}
        {(theme === 'material') && <div className={`${styles.bar} ${styles.barBlack}`}/>}
        {(theme === 'amaterial') && <div className={`${styles.bar} ${styles.barBlue}`}/>}
      </div>
    );
  }
}

export default ThemedInput;
