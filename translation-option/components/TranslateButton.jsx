const { React, getModule, getModuleByDisplayName } = require('powercord/webpack');
const Tooltip = getModuleByDisplayName('Tooltip', false);

const { Translate } = require('./icons');
const { button } = getModule([ 'button', 'buttonWrapper', 'pulseButton' ], false);

module.exports = class TranslationOption extends React.PureComponent {
  render () {
    const { Button } = this.props;
    return (
      <Tooltip text={this.props.name}>
        {({ onMouseLeave, onMouseEnter }) => (
          <Button
            size={Button.Sizes?.ICON}
            look={Button.Looks?.BLANK}
            onClick={this.props.onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className={button}>
              <Translate {...this.props.icon} />
            </div>
          </Button>
        )}
      </Tooltip>
    );
  }
};
