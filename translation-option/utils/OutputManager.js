module.exports = class OutputManager {
  constructor (startID, settings) {
    this.settings = settings;
    this.startID = startID;
  }

  success (msg) {
    const button = {
      text: 'OK',
      color: 'green',
      size: 'medium',
      look: 'outlined'
    };

    if (this.settings.hideSuccessToasts) {
      return;
    }
    this._main(msg, 'success', [ button ]);
  }

  error (msg, actions = []) {
    const buttons = [
      {
        text: 'okay',
        color: 'red',
        size: 'medium',
        look: 'outlined'
      },
      ...actions.map((action) => ({
        size: 'medium',
        look: 'outlined',
        ...action
      }))
    ];

    this._main(msg, 'danger', buttons);
  }

  _main (content, type, buttons) {
    const id = Math.random().toString(10).substr(2);
    powercord.api.notices.sendToast(`${this.startID}-${id}`, {
      header: 'Translation Option',
      content,
      type,
      buttons
    });
  }
};
