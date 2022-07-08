const axios = require('axios');
const createApp = require('ringcentral-chatbot/dist/apps').default;

const handle = async (event: any) => {
  const {type, text, group, bot} = event;
  if (type === 'Message4Bot') {
    if (text === 'ping') {
      await bot.sendMessage(group.id, {text: 'pong'});
    } else if (text === 'test') {
      await bot.sendAdaptiveCard(group.id, {
        type: 'AdaptiveCard',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.3',
        body: [
          {
            type: 'ActionSet',
            actions: [
              {
                type: 'Action.Submit',
                title: 'Open dialog',
                data: {
                  path: 'open-dialog',
                },
              },
            ],
          },
        ],
      });
    }
  } else if (type === 'UserSubmit') {
    return {
      type: 'dialog',
      dialog: {
        title: 'Dialog',
        size: 'large',
        iconUrl:
          'https://www.kindpng.com/picc/m/255-2554719_a-generic-square-placeholder-image-with-rounded-corners.png',
        // iframeUrl: 'https://www.ringcentral.com',
        card: {
          type: 'AdaptiveCard',
          version: '1.3',
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          body: [
            {
              type: 'TextBlock',
              text: 'Hello.',
              wrap: true,
              size: 'ExtraLarge',
              weight: 'Bolder',
            },
          ],
        },
      },
    };
  }
  return undefined;
};
const app = createApp(handle);
app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
  async () =>
    axios.put(
      `${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`,
      undefined,
      {
        auth: {
          username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
          password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD,
        },
      }
    ),
  24 * 60 * 60 * 1000
);
