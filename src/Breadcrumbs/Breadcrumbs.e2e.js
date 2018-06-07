
import eyes from 'eyes.it';
import {breadcrumbsTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('Breadcrumbs', () => {
  const storyUrl = getStoryUrl('6. Navigation', '6.2 Breadcrumbs');

  beforeAll(() => {
    browser.get(storyUrl);
  });

  eyes.it('should display breadcrumbs', () => {
    const driverNoLinks = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-no-links'});
    const driverWithLinks = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-with-links'});

    const breadcrumbsItems = ['first item', 'second item', 'third item'];
    const breadcrumbsLinkItems = ['Wix', 'Google', 'Yahoo'];

    waitForVisibilityOf([driverNoLinks.element(), driverWithLinks.element()], 'Cannot find Breadcrumbs')
    .then(() => {
      breadcrumbsItems.map((item, idx) =>
        expect(driverNoLinks.breadcrumbContentAt(idx)).toBe(item)
      );

      breadcrumbsLinkItems.map((item, idx) =>
        expect(driverWithLinks.breadcrumbContentAt(idx)).toBe(item)
      );
    });
  }, {version: '<Breadcrumbs/> - documentation fixes'});

  eyes.it('should show active item once clicked upon', () => {
    const driver = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-active'});
    const breadcrumbsItems = ['first item', 'second item', 'third item'];
    const itemToSelect = 2;

    waitForVisibilityOf(driver.element(), 'Cannot find Breadcrumbs')
    .then(() => {
      breadcrumbsItems.map((item, idx) =>
        expect(driver.breadcrumbContentAt(idx)).toBe(item)
      );

      expect(driver.getActiveItemId()).toBe(-1);
      driver.clickBreadcrumbAt(itemToSelect);
      expect(driver.getActiveItemId()).toBe(itemToSelect);
    });
  }, {version: '<Breadcrumbs/> - documentation fixes'});

  it('should call func on item click', () => {
    const driver = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-onclick'});
    const breadcrumbsItems = ['first item', 'second item', 'third item'];
    const idxToClick = 1;

    waitForVisibilityOf(driver.element(), 'Cannot find Breadcrumbs')
    .then(() => {
      breadcrumbsItems.map((item, idx) =>
        expect(driver.breadcrumbContentAt(idx)).toBe(item)
      );

      driver.clickBreadcrumbAt(idxToClick);
      const EC = protractor.ExpectedConditions;
      browser.wait(EC.alertIsPresent(), 10000, 'Alert is not getting present :(')
        .then(() => {
          expect(browser.switchTo().alert().getText()).toBe(`clicked element is: {"id":"${idxToClick + 1}","value":"${breadcrumbsItems[idxToClick]}"}`);
          browser.switchTo().alert().accept();
        });
    });
  });
});
