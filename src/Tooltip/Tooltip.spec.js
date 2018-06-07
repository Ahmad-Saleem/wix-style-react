import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import tooltipDriverFactory from './Tooltip.driver';
import Tooltip from './Tooltip';
import TooltipContent from './TooltipContent';
import {createDriverFactory} from '../test-common';
import {buttonTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import Button from '../../src/Button';

describe('Tooltip', () => {

  const createDriver = createDriverFactory(tooltipDriverFactory);
  const _props = {showDelay: 5, hideDelay: 5, content: <TooltipContent children={'I\'m the content'}/>};
  const children = <div>Here there is a children</div>;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be hidden by default', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.isShown()).toBeFalsy();
  });

  it('should show a tooltip once hovering', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
    });
  });

  it('should hide when mouse leaving', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
      driver.mouseLeave();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });

  it('should test inner component', () => {
    const dataHook = 'button_data_hook';
    const buttonContent = (
      <div>
        Custom Content...&nbsp;
        <Button dataHook={dataHook} id="inner-button" height="small">Button content</Button>
      </div>
    );
    const driver = createDriver(<Tooltip showDelay={5} hideDelay={5} content={buttonContent}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
      const buttonTestkit = buttonTestkitFactory({wrapper: driver.getTooltipWrapper(), dataHook});
      expect(buttonTestkit.getButtonTextContent()).toBe('Button content');
    });
  });

  it('should not override focus event', () => {
    const onFocus = jest.fn();
    const onFocusedChild = <div onFocus={onFocus}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onFocusedChild}</Tooltip>);
    driver.focus();
    expect(onFocus).toBeCalled();
  });

  it('should not override blur event', () => {
    const onBlur = jest.fn();
    const onBluredChild = <div onBlur={onBlur}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onBluredChild}</Tooltip>);
    driver.blur();
    expect(onBlur).toBeCalled();
  });

  it('should not override click event', () => {
    const onClick = jest.fn();
    const onClickedChild = <div onClick={onClick}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onClickedChild}</Tooltip>);
    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not override mouse enter event', () => {
    const onMouseEnter = jest.fn();
    const onMouseEnteredChild = <div onMouseEnter={onMouseEnter}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseEnteredChild}</Tooltip>);
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should not override mouse leave event', () => {
    const onMouseLeave = jest.fn();
    const onMouseLeavedChild = <div onMouseLeave={onMouseLeave}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseLeavedChild}</Tooltip>);
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('should support error theme', () => {
    const driver = createDriver(<Tooltip theme={'error'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasErrorTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasErrorTheme()).toBeTruthy();
    });
  });

  it('should support dark theme', () => {
    const driver = createDriver(<Tooltip theme={'dark'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasDarkTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasDarkTheme()).toBeTruthy();
    });
  });

  it('should support light theme', () => {
    const driver = createDriver(<Tooltip theme={'light'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasLightTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasLightTheme()).toBeTruthy();
    });
  });

  it('should have a children', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.getChildren()).toBe('Here there is a children');
  });

  it('should have a content', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.getContent()).toBe('I\'m the content');
    });
  });

  it('should cancel mouse leave, when followed by mouse enter immediately', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    driver.mouseLeave();
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBe(true);
    });
  });

  it('should call onShow when tooltip is shown', () => {
    const onShow = jest.fn();
    const driver = createDriver(<Tooltip {...{..._props, onShow}}>{children}</Tooltip>);

    driver.mouseEnter();

    expect(onShow).not.toHaveBeenCalled();
    return resolveIn(30).then(() => {
      expect(onShow).toHaveBeenCalled();
      expect(driver.isShown()).toBeTruthy();
    });
  });

  it('should call onHide when tooltip is hidden', () => {
    const onHide = jest.fn();
    const driver = createDriver(<Tooltip {...{..._props, onHide}}>{children}</Tooltip>);

    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();

      driver.mouseLeave();

      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeFalsy();
        expect(onHide).toHaveBeenCalled();
      });
    });

  });

  it('should append to element selected', () => {
    const el = document.createElement('div');
    const driver = createDriver(<Tooltip {..._props} appendTo={el}>{children}</Tooltip>);
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(el.childElementCount).toEqual(1);
    });
  });

  describe('custom triggers', () => {
    it('should hide tooltip', () => {
      const props = {..._props, hideTrigger: 'custom', showTrigger: 'custom'};
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30)
        .then(() => {
          expect(driver.isShown()).toBeFalsy();
          driver.setProps({...props, active: true});
          return resolveIn(30);
        })
        .then(() => {
          expect(driver.isShown()).toBeTruthy();
          driver.setProps({...props, active: false});
          return resolveIn(30);
        })
        .then(() => {
          expect(driver.isShown()).toBeFalsy();
        });
    });

    it('should not show tooltip when transitioned to both active and disabled', () => {
      const props = {
        ..._props,
        hideTrigger: 'custom',
        showTrigger: 'custom',
        active: false,
        disabled: false
      };
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      return resolveIn(30)
        .then(() => {
          expect(driver.isShown()).toBeFalsy();
          driver.setProps({...props, active: true, disabled: true});
          return resolveIn(30);
        })
        .then(() => {
          expect(driver.isShown()).toBeFalsy();
        });
    });
    it('should close tooltip when disabled changed to true when was active true before', () => {
      const props = {
        ..._props,
        hideTrigger: 'custom',
        showTrigger: 'custom',
        active: true,
        disabled: false
      };
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      return resolveIn(30)
        .then(() => {
          expect(driver.isShown()).toBeTruthy();
          driver.setProps({...props, disabled: true});
          return resolveIn(30);
        })
        .then(() => {
          expect(driver.isShown()).toBeFalsy();
        });
    });
  });

  describe('placement attribute', () => {
    it('should be top by default', () => {
      const driver = createDriver(<Tooltip {...{..._props}}>{children}</Tooltip>);
      driver.mouseEnter();

      return resolveIn(30).then(() => {
        expect(driver.getPlacement()).toBe('top');
      });
    });

    ['top', 'bottom', 'left', 'right'].forEach(placement => {
      it(`should be ${placement}`, () => {
        const driver = createDriver(<Tooltip {...{..._props}} placement={placement}>{children}</Tooltip>);
        driver.mouseEnter();

        return resolveIn(30).then(() => {
          expect(driver.getPlacement()).toBe(placement);
        });
      });
    });
  });

  describe('maxWidth attribute', () => {
    it('should set default maxWidth 204', () => {
      const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getMaxWidth()).toBe('204px');
      });
    });

    it('should set custom maxWidth', () => {
      const props = {..._props, maxWidth: '400px'};
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getMaxWidth()).toBe('400px');
      });
    });
  });

  describe('minWidth attribute', () => {
    it('should not have any min-width as default', () => {
      const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getMinWidth()).toBe(undefined);
      });
    });

    it('should set custom min-width', () => {
      const props = {..._props, minWidth: '150px'};
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getMinWidth()).toBe('150px');
      });
    });
  });

  describe('alignment attribute', () => {
    it('should set default left', () => {
      const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getAlignment()).toBe('left');
      });
    });
  });

  describe('padding attribute', () => {
    it('should set default to none', () => {
      const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getPadding()).toBe(undefined);
      });
    });
    it('should set custom padding', () => {
      const props = {..._props, padding: '5px'};
      const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.getPadding()).toBe('5px');
      });
    });
  });

  describe('testkit', () => {

    const createTooltipTestkitDriver = props => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const tooltipProps = {..._props, ...props};
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Tooltip dataHook={dataHook} {...tooltipProps}>{children}</Tooltip></div>));
      const driver = tooltipTestkitFactory({wrapper, dataHook});
      return driver;
    };

    it('should exist', () => {
      const driver = createTooltipTestkitDriver();
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });

    it('should exist with default props when appendToParent', () => {
      const driver = createTooltipTestkitDriver({appendToParent: true});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
        expect(driver.getContent()).toBe('I\'m the content');
        expect(driver.hasLightTheme()).toBeTruthy();
        expect(driver.getPlacement()).toBe('top');
      });
    });

    it('should have dark theme when appendToParent', () => {
      const driver = createTooltipTestkitDriver({appendToParent: true, theme: 'dark'});
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.hasDarkTheme()).toBeTruthy();
      });
    });

    it('should have error theme when appendToParent', () => {
      const driver = createTooltipTestkitDriver({appendToParent: true, theme: 'error'});
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.hasErrorTheme()).toBeTruthy();
      });
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });

    it('should remove a tooltip immediately once the component is destroyed', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props} hideDelay={1000}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
        wrapper.unmount();
        return resolveIn(1);
      }).then(() => {
        expect(driver.isShown()).toBeFalsy();
      });
    });

    it('should have fadeIn class and delay when showImmediately is unspecified', () => {
      const driver = createDriver(<Tooltip {..._props} content={<div>HELLO WORLD</div>}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.hasAnimationClass()).toBeTruthy();
      });
    });

    it('should have fadeIn class and delay when showImmediately is false', () => {
      const driver = createDriver(<Tooltip {..._props} content={<div>HELLO WORLD</div>} showImmediately={false}>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.hasAnimationClass()).toBeTruthy();
      });
    });

    it('should not have fadeIn class and no delay when showImmediately is true', () => {
      const driver = createDriver(<Tooltip {..._props} content={<div>HELLO WORLD</div>} showImmediately>{children}</Tooltip>);
      driver.mouseEnter();
      return resolveIn(0).then(() => {
        expect(driver.hasAnimationClass()).toBeFalsy();
      });
    });
  });
});

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}
