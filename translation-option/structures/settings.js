const { React } = require('powercord/webpack');
const EngineCard = require('../components/EngineCard.jsx');

module.exports = function (Translator) {
  const { i18n: { Messages } } = require('powercord/webpack');

  return [
    {
      type: 'tabBar',
      selected: '1',
      items: [
        {
          name: Messages.POWERCORD_GENERAL_SETTINGS,
          items: []
        },
        {
          name: Messages.TRANSLATION_OPTION_ENGINE,
          items: Object.entries(Translator.infoEngines)
            .map(([ id, value ]) => (props) => (
              React.createElement(EngineCard, {
                isInstalled: () => Translator.engineIsInstalled(id),
                onInstall: () => Translator.installEngine(id),
                product: {
                  name: value.name,
                  description: value.description,
                  icon: value.icon,
                  settings: value.settings
                },
                ...props
              })
            ))
        }
      ]
    }
  ];
};
