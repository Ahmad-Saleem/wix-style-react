import eyes from 'eyes.it';
import path from 'path';
import {filePickerTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('FilePicker', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.10 + FilePicker');
  const dataHook = 'story-filepicker';

  eyes.it('should display filePicker', () => {
    const driver = filePickerTestkitFactory({dataHook});

    browser.get(storyUrl);
    waitForVisibilityOf(driver.element(), 'Cannot find FilePicker')
      .then(() => {
        const imagePath = '../../test/assets/surf-musa.png';
        const absolutePath = path.resolve(__dirname, imagePath);

        expect(driver.getSubLabel()).toBe('No file chosen (Max size 5 MB)');

        driver.getInput().sendKeys(absolutePath);
        expect(driver.getSubLabel()).toBe('surf-musa.png');
      });
  });
});
