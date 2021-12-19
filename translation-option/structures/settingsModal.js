/* eslint-disable no-undefined,object-property-newline */
const { React } = require('powercord/webpack');
const Call = require('../components/Call.jsx');

const codes = require('../codes.json');

module.exports = function (Translator) {
  const { i18n: { Messages } } = require('powercord/webpack');
  const { infoEngines } = Translator;

  const genBaseSelectors = (startKey, baseTo) => {
    const readyEngines = Object.entries(infoEngines).filter(([ k ]) => Translator.engineIsReady(k));

    return [
      {
        type: 'select',
        name: Messages.TRANSLATION_OPTION_ENGINE,
        key: `${startKey}Engine`,
        def: null,
        disabled: () => !readyEngines.length,
        items: readyEngines.map(([ key, { name } ]) => ({
          label: name,
          value: key
        }))
      },
      {
        type: 'select',
        name: Messages.TRANSLATION_OPTION_RECEIVED_LANGUAGE,
        key: `${startKey}From`,
        def: 'auto',
        items: ({ getSetting }) => {
          const engine = getSetting(`${startKey}Engine`, null);
          const base = (engine && infoEngines[engine].noSupportAuto) ? [] : [ { label: 'Auto', value: 'auto' } ];

          if (engine) {
            return [
              ...base,
              ...infoEngines[engine].languages
                .filter((c) => c in codes)
                .map((c) => ({
                  label: `${codes[c].LocalLanguageName} (${codes[c].EnglishLanguageName})`,
                  value: c
                }))
            ];
          }
          return base;
        }
      },
      {
        type: 'select',
        name:  Messages.TRANSLATION_OPTION_TARGET_LANGUAGE,
        key: `${startKey}To`,
        def: (startKey === 'in') ? Translator.userLocale : null,
        items: ({ getSetting }) => {
          const engine = getSetting(`${startKey}Engine`, null);
          if (engine) {
            return [
              ...baseTo,
              ...infoEngines[engine].languages
                .filter((c) => c in codes)
                .map((c) => ({
                  label: `${codes[c].LocalLanguageName} (${codes[c].EnglishLanguageName})`,
                  value: c
                }))
            ];
          }
          return baseTo;
        }
      }
    ];
  };

  return [
    {
      type: 'tabBar',
      items: [
        {
          name: React.createElement(Call, { type: 'in' }),
          items: [
            {
              type: 'switch',
              name:  Messages.TRANSLATION_OPTION_TRANSLATE_MESSAGES,
              note:  Messages.TRANSLATION_OPTION_TRANSLATE_INCOMING_MESSAGES_NOTE,
              key: 'inMessages',
              def: false
            },
            ...genBaseSelectors('in', [
              {
                label: `Auto (${codes[Translator.userLocale].LocalLanguageName})`,
                value: Translator.userLocale
              }
            ])
          ]
        },
        {
          name: React.createElement(Call, { type: 'out' }),
          items: [
            {
              type: 'switch',
              name:  Messages.TRANSLATION_OPTION_TRANSLATE_MESSAGES,
              note:  Messages.TRANSLATION_OPTION_TRANSLATE_OUTGOING_MESSAGES_NOTE,
              key: 'outMessages',
              def: false
            },
            ...genBaseSelectors('out', [])
          ]
        }
      ]
    }
  ];
};
