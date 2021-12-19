const { React, i18n: { Messages } } = require('powercord/webpack');
const { Button, FormTitle, modal: { Modal } } = require('powercord/components');
const { close } = require('powercord/modal');

const Settings = require('./Settings.jsx');
const { settingsModal } = require('../structures');

module.exports = class SettingsModal extends React.PureComponent {
  render () {
    return (
      <Modal className="powercord-text" size={Modal.Sizes.SMALL}>
        <Modal.Header>
          <FormTitle>{Messages.TRANSLATION_OPTION_MODAL_SETTINGS}</FormTitle>
          <Modal.CloseButton onClick={close} />
        </Modal.Header>
        <Modal.Content>
          <Settings
            items={settingsModal(this.props.Translator)}
            {...this.props}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={close}>
            {Messages.CLOSE}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
