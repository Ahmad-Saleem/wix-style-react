import {isFocused} from '../test-common';
import buttonDriverFactory from './RichTextAreaButton.protractor.driver';

export const BUTTON_TYPES = ['bold', 'italic', 'underline', 'link', 'unordered-list', 'ordered-list'];

const richTextAreaDriverFactory = component => {

  const getToolbarButton = buttonIndex => component.$('[data-hook="toolbar"]')
    .$(`[data-hook="rich-text-area-button-${BUTTON_TYPES[buttonIndex]}"]`);

  return {
    element: () => component,
    enterLinkUrl: link => component
      .$('[data-hook="rich-text-area-link-url"] input').sendKeys(link),
    enterLinkText: text => component
      .$('[data-hook="rich-text-area-link-text"] input').sendKeys(text),
    enterText: text => component.$('[data-hook="editor-wrapper"] > div[contenteditable="true"]').sendKeys(text),
    insertLink: () => component.$('button[type="submit"]').click(),
    getContent: () => component.$('[data-hook="editor-wrapper"] > div[contenteditable="true"]').getAttribute('innerHTML'),
    getText: () => component.$('[data-hook="editor-wrapper"] > div[contenteditable="true"]').getText(),
    getToolbarButtonDriver: buttonIndex => buttonDriverFactory(getToolbarButton(buttonIndex)),
    selectLastWord: () => {
      return browser.actions().doubleClick(
        component
          .$('[data-hook="editor-wrapper"] > div[contenteditable="true"]')
      ).perform();
    },
    async isLinkAdded(link) {
      const content = await this.getContent();
      return content.indexOf(`href="${link}"`) !== -1;
    },
    isEditorFocused: () => isFocused(component.$('[data-slate-editor="true"]')),
    isButtonFocused: buttonIndex => isFocused(getToolbarButton(buttonIndex)),
    isLinkDialogVisible: async ({withText} = {withText: true}) => {
      const until = protractor.ExpectedConditions;
      if (withText) {
        const textInput = await component.$('[data-hook="rich-text-area-link-text"]');
        await browser.wait(until.presenceOf(textInput), 5000);
      }
      const urlInput = await component.$('[data-hook="rich-text-area-link-url"]');
      await browser.wait(until.presenceOf(urlInput), 5000);
    },
    clickButton: buttonIndex => isFocused(getToolbarButton(buttonIndex)),
    clickButtonByType: type => component
      .$('[data-hook="toolbar"]')
      .$(`[data-hook="rich-text-area-button-${type}"]`)
      .click()
  };
};

export default richTextAreaDriverFactory;
