export class ActionButton {
  constructor(public icon: string,
              public color: string,
              public tip: string,
              public action: () => void) {
  }
}
