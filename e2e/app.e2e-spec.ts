import { AngularSeoPage } from './app.po';

describe('angular-seo App', () => {
  let page: AngularSeoPage;

  beforeEach(() => {
    page = new AngularSeoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
