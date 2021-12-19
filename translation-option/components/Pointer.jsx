const { React, getModule, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack');
// const { Tooltip } = require('powercord/components');

const codes = require('../codes.json');

const Tooltip = getModuleByDisplayName('Tooltip', false);
const { timestamp, timestampInline, edited } = getModule([ 'timestamp', 'timestampInline', 'edited' ], false);

module.exports = class TranslationOption extends React.PureComponent {
  render () {
    const from = this.props.from
      .filter((e, i, arr) => (arr.indexOf(e) === i))
      .map((e) => codes[e]?.EnglishLanguageName || e).join(', ');
    const to = codes[this.props.to].EnglishLanguageName;

    return (
      <Tooltip text={`From: ${from} | To: ${to}`}>
        {({ onMouseLeave, onMouseEnter }) => (
          <span
            className={[ timestamp, timestampInline ].join(' ')}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <span className={edited}>({Messages.TRANSLATION_OPTION_TRANSLATED})</span>
          </span>
        )}
      </Tooltip>
    );
  }
};
