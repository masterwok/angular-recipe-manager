import { MomsRecipesPage } from './app.po';

describe('moms-recipes App', () => {
  let page: MomsRecipesPage;

  beforeEach(() => {
    page = new MomsRecipesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
