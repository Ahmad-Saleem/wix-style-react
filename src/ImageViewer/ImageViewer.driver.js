import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit';

const imageViewerDriverFactory = ({component, wrapper, element}) => {

  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const image = () => byHook('image-viewer-image');
  const addImageButton = () => byHook('add-image');
  const updateImageButton = () => buttonTestkitFactory({wrapper: element, dataHook: 'update-image'});
  const removeImageButton = () => buttonTestkitFactory({wrapper: element, dataHook: 'remove-image'});
  const errorIcon = () => byHook('error-tooltip');

  return {
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    getImageUrl: () => image().getAttribute('src'),
    isImageVisible: () => !!image(),
    isErrorVisible: () => !!errorIcon(),
    clickAdd: () => ReactTestUtils.Simulate.click(addImageButton()),
    clickUpdate: () => updateImageButton().click(),
    clickRemove: () => removeImageButton().click(),
    exists: () => !!element,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default imageViewerDriverFactory;
