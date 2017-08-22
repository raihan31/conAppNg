import { DemoSecAppPage } from './app.po';

describe('demo-sec-app App', () => {
  let page: DemoSecAppPage;

  beforeEach(() => {
    page = new DemoSecAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
