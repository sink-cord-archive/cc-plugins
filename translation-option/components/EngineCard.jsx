const { React, getModule, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack');
const { Button, Card, Tooltip, Divider, Clickable, Icons: { Close } } = require('powercord/components');

const { resolve } = require('path');

const BaseProductPath = resolve(__dirname, '../../', 'pc-moduleManager/components/parts/BaseProduct');
const BaseProduct = require(BaseProductPath);
const Settings = require('./Settings.jsx');

const Download = getModuleByDisplayName('Download', false);
const { downloadArrow } = getModule([ 'downloadArrow' ], false);
const { colorDanger } = getModule([ 'colorDanger' ], false);

module.exports = class EngineCard extends BaseProduct {
  constructor (props) {
    super(props);
    this.state = {
      openSettings: false,
      freezeInstallBtn: false,
      isInstalled: props.isInstalled(),
      failedInstall: false
    };

    this.installHandler = this.installHandler.bind(this);
  }

  render () {
    return (
      <Card className='powercord-product translation-option-engine-card'>
        {this.renderHeader()}
        {(this.state.openSettings)
          ? this.renderSettings()
          : <div style={{ opacity: ((this.state.isInstalled) ? '1' : '0.5') }}>
            {this.renderDetails()}
            {this.renderFooter()}
          </div>
        }
      </Card>
    );
  }

  renderHeader () {
    return (
      <div className='powercord-product-header-with-icon'>
        { this.renderIcon() }
        <div className='powercord-product-header'>
          <h4>{this.props.product.name}</h4>
          {(!this.state.isInstalled) &&
          <Tooltip text={Messages.TRANSLATION_OPTION_INSTALL}>
            <div className={[
              this.state.failedInstall ? colorDanger : downloadArrow,
              this.state.freezeInstallBtn ? 'downloadArrow-freezed' : null
            ].join(' ')}
            >
              <Clickable onClick={this.installHandler}>
                <Download/>
              </Clickable>
            </div>
          </Tooltip>
          }
        </div>
      </div>
    );
  }

  installHandler () {
    if (this.state.freezeInstallBtn) {
      return;
    }
    this.setState({ freezeInstallBtn: true });
    this.props.onInstall()
      .then(() => this.setState({
        isInstalled: true
      }))
      .catch(() => this.setState({
        failedInstall: true
      }));
  }

  renderIcon () {
    return (
      <div className='translation-option-engine-card-icon'>
        { this.props.product.icon && <this.props.product.icon/> }
      </div>
    );
  }

  renderSettings () {
    return (
      <div className='translation-option-engine-card-settings'>
        <Divider/>

        <div className='close-button'>
          <div>
            <Tooltip text={Messages.CLOSE}>
              <Clickable onClick={() => this.setState({ openSettings: false })}>
                <Close/>
              </Clickable>
            </Tooltip>
          </div>
        </div>

        <Settings
          items={this.props.product.settings}
          getSetting={this.props.getSetting}
          updateSetting={this.props.updateSetting}
          toggleSetting={this.props.toggleSetting}
        />
      </div>
    );
  }

  renderFooter () {
    return (
      <>
        <Divider/>
        <div className='powercord-product-footer'>
          <div className='buttons'>
            {(this.state.isInstalled && this.props.product.settings) &&
              <Button
                onClick={() => this.setState({ openSettings: true })}
                look={Button.Looks.FILLED}
                size={Button.Sizes.SMALL}
              >
                {Messages.TRANSLATION_OPTION_SETTINGS}
              </Button>}
          </div>
        </div>
      </>
    );
  }
};
