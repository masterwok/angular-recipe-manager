import {ActionButtonsService} from './action-buttons.service';
import {ActionButton} from '../footer-action-buttons/models/action-button.model';


describe('ActionButtonsService', () => {

  let service: ActionButtonsService;

  beforeEach(() => {
    service = new ActionButtonsService();
  });

  it(`setActionButtons() should notify subscribers of updated buttons`, () => {

    const testButton = new ActionButton('asdf', '123', 'qwer', null);

    service.actionButtonSubject.subscribe(buttons => {
      const button = buttons[0];

      expect(button.color).toBe(testButton.color);
      expect(button.icon).toBe(testButton.icon);
      expect(button.tip).toBe(testButton.tip);
    });

    service.setActionButtons([testButton]);

  });

  it(`getActionButtons() should return correct buttons`, () => {

    const testButton = new ActionButton('asdf', '123', 'qwer', null);

    service.actionButtonSubject.subscribe(buttons => {
      const button = service.getActionButtons()[0];

      expect(button.color).toBe(testButton.color);
      expect(button.icon).toBe(testButton.icon);
      expect(button.tip).toBe(testButton.tip);
    });

    service.setActionButtons([testButton]);

  });

});
