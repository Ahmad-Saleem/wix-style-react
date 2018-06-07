import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageViewer.scss';
import Tooltip from '../Tooltip';
import Button from '../Button';
import Delete from 'wix-ui-icons-common/Delete';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';
import Replace from 'wix-ui-icons-common/Replace';
import WixComponent from '../BaseComponents/WixComponent';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import classNames from 'classnames';

class ImageViewer extends WixComponent {

  render() {

    const {
      imageUrl,
      onAddImage,
      onUpdateImage,
      onRemoveImage,
      width,
      height,
      error
    } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'top',
      theme: 'dark'
    };
    const classes = classNames(style.container, {[style.hasLogo]: imageUrl, [style.hasError]: error, [style.addPadding]: !imageUrl});
    return (
      <div className={classes} style={{width, height}} data-hook="image-container">
        <div data-hook="add-image" className={style.addLogo} onClick={onAddImage}>
          <div className={style.dashedBorder}/>
          <div className={style.plusIcon}><AddMedia size="31px"/></div>
        </div>
        {!!imageUrl &&
        <div className={style.changeLogoContainer}>
          <div className={style.imageLayout}>
            <img data-hook="image-viewer-image" className={style.image} src={imageUrl}/>
          </div>
          <div className={style.imageBackground}>
            <div className={style.buttons}>
              <Tooltip content="Replace" {...tooltipCommonProps}>
                <Button dataHook="update-image" onClick={onUpdateImage} theme="icon-whitesecondary">
                  <Replace size="1.5em"/>
                </Button >
              </Tooltip>
              <Tooltip content="Remove" {...tooltipCommonProps}>
                <Button dataHook="remove-image" theme="icon-whitesecondary" onClick={onRemoveImage}>
                  <Delete size="1.5em"/>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        }
        {!!error &&
        <Tooltip
          dataHook="error-tooltip"
          disabled={!this.props.errorMessage}
          placement={this.props.tooltipPlacement}
          content={this.props.errorMessage}
          {...tooltipCommonProps}
          >
          <div className={style.exclamation}><FormFieldError/></div>
        </Tooltip>}

      </div>
    );
  }
}

ImageViewer.propTypes = {
  imageUrl: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onAddImage: PropTypes.func,
  onUpdateImage: PropTypes.func,
  onRemoveImage: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

export default ImageViewer;
