const { React, getModule, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack');

const { colorBrand, colorDanger } = getModule([ 'colorBrand', 'colorDanger' ], false);
const Arrow = getModuleByDisplayName('Arrow', false);

module.exports = class Call extends React.PureComponent {
  render () {
    const { type } = this.props;
    return (
      <div className='translation-option-call-arrow'>
        <Arrow
          direction={(type === 'in') ? 'DOWN' : 'UP'}
          className={((type === 'in') ? colorBrand : colorDanger)}
        />
        <span className='powercord-text'>
          {(type === 'in') ? Messages.TRANSLATION_OPTION_INCOMING : Messages.TRANSLATION_OPTION_OUTGOING}
        </span>
      </div>
    );
  }
};
