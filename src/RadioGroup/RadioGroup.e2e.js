import eyes from 'eyes.it';
import {radioGroupTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {NUM_OF_BUTTONS_IN_EXAMPLE} from '../../stories/RadioGroup.story';
import {flattenInternalDriver} from '../test-common';

describe('RadioGroup', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.3 Radio Button Group');
  const dataHook = 'storybook-radiogroup';
  const radioGroupDriver = radioGroupTestkitFactory({dataHook});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  afterEach(() => {
    autoExampleDriver.reset();
  });

  eyes.it('should select the second option in a group', () => {
    waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
      .then(() => {
        radioGroupDriver.selectByIndex(1).click();
        expect(radioGroupDriver.isRadioChecked(1)).toBe(true);
      });
  });

  eyes.it('should not select disabled option', () => {
    autoExampleDriver.setProps({disabledRadios: [4]});

    waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
      .then(() => {
        expect(radioGroupDriver.isRadioDisabled(3)).toBe(true);
        browser.actions().mouseMove(radioGroupDriver.getRadioAtIndex(3)).click();
        expect(radioGroupDriver.isRadioChecked(3)).toBe(false);
      });
  });

  describe('Focus tests', () => {

    const pressTab = () => browser.actions().sendKeys(protractor.Key.TAB).perform();
    const groupDriver = radioGroupDriver;

    const expectNotFocused = async (msg, driver) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(await driver.isFocused()).toBe(false, `${prefix}focused`);
      expect(await driver.hasFocusState()).toBe(false, `${prefix}hasFocusState`);
      expect(await driver.hasFocusVisibleState()).toBe(false, `${prefix}hasFocusVisibleState`);
    };

    const expectFocusedByKeyboard = async (msg, driver) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(await driver.isFocused()).toBe(true, `${prefix}focused`);
      expect(await driver.hasFocusState()).toBe(true, `${prefix}hasFocusState`);
      expect(await driver.hasFocusVisibleState()).toBe(true, `${prefix}hasFocusVisibleState`);
    };

    const expectFocusedByMouse = async (msg, driver) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(await driver.isFocused()).toBe(true, `${prefix}focused`);
      expect(await driver.hasFocusState()).toBe(true, `${prefix}hasFocusState`);
      expect(await driver.hasFocusVisibleState()).toBe(false, `${prefix}hasFocusVisibleState`);
    };

    beforeEach(() => {
      // Needed in order to reset the focus state
      browser.get(storyUrl);
    });

    eyes.it('should show focus styles when navigated by keyboard', async () => {
      waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
        .then(async () => {
        // TODO: replace with forEachAsync
          for (let index = 0; index < NUM_OF_BUTTONS_IN_EXAMPLE; index++) {
            const driver = flattenInternalDriver(groupDriver.getButtonDriver(index));
            await expectNotFocused(`button ${index} - before`, driver);
            await pressTab();
            await expectFocusedByKeyboard(`button ${index} - after`, driver);
            index === 0 && await eyes.checkWindow(`button ${index} with focus-visible`);
          }
        });
    });

    it('should to be selected but NOT to show focus styles when clicked by mouse', async () => {
      waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
        .then(async () => {
        // TODO: replace with forEachAsync
          for (let index = 0; index < NUM_OF_BUTTONS_IN_EXAMPLE; index++) {
            const driver = flattenInternalDriver(groupDriver.getButtonDriver(index));
            await expectNotFocused(`button ${index} - before`, driver);
            await driver.clickRoot();
            expect(await radioGroupDriver.isRadioChecked(index)).toBe(true);
            await expectFocusedByMouse(`button ${index} - after`, driver);
          }
        });
    });

    eyes.it('should show focus styles on first item (selected)', async () => {
      await autoExampleDriver.setProps({value: 1});
      await waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
        .then(async () => {
          const driver = flattenInternalDriver(groupDriver.getButtonDriver(0));
          expect(await radioGroupDriver.isRadioChecked(0)).toBe(true);
          await expectNotFocused(`button 0 - before`, driver);
          await pressTab();
          await expectFocusedByKeyboard(`button 0 - after`, driver);
        });
    });
  });
});

