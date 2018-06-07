import React from 'react';
import ImageViewer from './ImageViewer';
import ImageViewerDriverFactory from './ImageViewer.driver';
import {createDriverFactory, resolveIn} from '../test-common';
import {imageViewerTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {imageViewerTestkitFactory as enzymeImageViewerTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';

describe('ImageViewer', () => {

  const createDriver = createDriverFactory(ImageViewerDriverFactory);
  let props, driver;
  const IMAGE_URL = 'some-image-url.png';
  const addImage = jest.fn();
  const updateImage = jest.fn();
  const removeImage = jest.fn();

  describe('when default scenario', () => {
    beforeEach(() => {
      props = {
        imageUrl: IMAGE_URL,
        onAddImage: addImage,
        onUpdateImage: updateImage,
        onRemoveImage: removeImage
      };
      driver = createDriver(<ImageViewer {...props}/>);
    });

    it('should display image url', () => {
      expect(driver.getImageUrl()).toBe(IMAGE_URL);
    });

    it('should trigger add image', () => {
      driver.clickAdd();
      expect(addImage).toBeCalled();
    });

    it('should trigger update image', () => {
      driver.clickUpdate();
      expect(updateImage).toBeCalled();
    });

    it('should trigger remove image', () => {
      driver.clickRemove();
      expect(removeImage).toBeCalled();
    });

  });

  it('should not display image if not exists', () => {
    props = {
      imageUrl: ''
    };
    driver = createDriver(<ImageViewer {...props}/>);
    expect(driver.isImageVisible()).toBeFalsy();
  });

  describe('height and width', () => {
    it('should be added to style attribute when image is not present', () => {
      props = {
        imageUrl: '',
        width: 300,
        height: 300
      };
      driver = createDriver(<ImageViewer {...props}/>);
      expect(driver.getContainerStyles()).toEqual('width: 300px; height: 300px;');
    });

    it('should be added to style attribute when image is present', () => {
      props = {
        imageUrl: IMAGE_URL,
        width: 300,
        height: 300
      };
      driver = createDriver(<ImageViewer {...props}/>);
      expect(driver.getContainerStyles()).toEqual('width: 300px; height: 300px;');
    });

    it('should not add style attribute when width and height props are not passed', () => {
      props = {
        imageUrl: IMAGE_URL
      };
      driver = createDriver(<ImageViewer {...props}/>);
      expect(driver.getContainerStyles()).toEqual(null);
    });
  });


  describe('Error state', () => {

    it('should not display error icon by defualt', () => {

      props = {
        imageUrl: '',
        width: 300,
        height: 300
      };

      driver = createDriver(<ImageViewer {...props}/>);
      expect(driver.isErrorVisible()).toBeFalsy();
    });

    it('should display error icon on error with the correct message', () => {

      props = {
        imageUrl: '',
        width: 300,
        height: 300,
        error: true,
        errorMessage: 'Oh My God!'
      };

      driver = createDriver(<ImageViewer {...props}/>);
      const wrapper = driver.getElement();
      const errorTooltipDriver = tooltipTestkitFactory({wrapper, dataHook: 'error-tooltip'});
      errorTooltipDriver.mouseEnter();
      return resolveIn(50)
        .then(() => {
          expect(errorTooltipDriver.isShown()).toBeTruthy();
          expect(errorTooltipDriver.getContent()).toEqual(props.errorMessage);
        });
    });

  });


  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><ImageViewer dataHook={dataHook}/></div>));
      const imageViewerTestkit = imageViewerTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<ImageViewer dataHook={dataHook}/>);
      const imageViewerTestkit = enzymeImageViewerTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

});
