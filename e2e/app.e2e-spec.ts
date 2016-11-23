import { CbaAppPage } from './app.po';

describe('cba-app App', function() {
  let page: CbaAppPage;

  beforeEach(() => {
    page = new CbaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
