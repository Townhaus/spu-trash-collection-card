# Custom SPU Trash Collection Card

Created using [custom-cards/boilerplate-card](https://github.com/custom-cards/boilerplate-card)

## Options

| Name              | Type    | Requirement  | Description                                 | Default                                     |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------------------------------- |
| type              | string  | **Required** | `custom:spu-trash-collection-card`          |                                             |
| collection_days   | object  | **Required** | Collection Days                             | `{compost: '', garbage: '', recyclyng: ''}` |
| name              | string  | **Optional** | Card name                                   | `SPU Trash Collection`                      |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`                                     |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`                                     |
| entity            | string  | **Optional** | Home Assistant entity ID.                   | `none`                                      |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info`                         |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`                                      |
| double_tap_action | object  | **Optional** | Action to take on hold                      | `none`                                      |

## Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) _success, warning, failure, light, medium, heavy, selection_ | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `non`       |

## Dev Scripts

💻 `npm run build`

💻 `npm run start`

💻 `npm run lint`

## Development

1. Run `npm start`
2. The compiled `.js` file will be accessible on
   `http://127.0.0.1:5000/spu-trash-collection-card.js`.
3. On a running Home Assistant installation add this to your Lovelace `resources`:

```yaml
- url: 'http://127.0.0.1:5000/spu-trash-collection-card.js'
  type: module
```

_Change "127.0.0.1" to the IP of your development machine._

## Example

![image](https://user-images.githubusercontent.com/14980353/81027899-41b44c00-8e34-11ea-8d58-a1f2c51bed91.png)

Add this to your Lovelace `cards` config:

```yaml
- type: custom:spu-trash-collection-card
   name: Trash Collection
   collection_days:
      compost: sensor.compost_collection
      garbage: sensor.garbage_collection
      recycling: sensor.recycling_collection
```
