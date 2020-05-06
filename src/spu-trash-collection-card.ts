import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  // PropertyValues
} from 'lit-element';

import {
  HomeAssistant,
  // hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers';

import './editor';

import { SpuTrashCollectionCardConfig, CollectionDaysInfo } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';

import { localize } from './localize/localize';

import { getCollectionDaysInfo } from './lib/collectionDaysHelpers.js';

/* eslint no-console: 0 */
console.info(
  `%c  SPU-TRASH-COLLECTION-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('spu-trash-collection-card')
export class SpuTrashCollectionCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('spu-trash-collection-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): object {
    return {};
  }

  @property() public hass?: HomeAssistant;
  @property() private _config?: SpuTrashCollectionCardConfig;
  @property() private collectionDaysInfo: CollectionDaysInfo[] = [];

  public setConfig(config: SpuTrashCollectionCardConfig): void {
    if (!config || config.show_error) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (!config.collection_days) {
      throw new Error(localize('common.collection_days'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this._config = {
      name: 'SPU Trash Collection',
      collection_days: {
        compost: '',
        garbage: '',
        recycling: '',
      },
      ...config,
    };
  }

  // protected shouldUpdate(changedProps: PropertyValues): boolean {
  //   return hasConfigOrEntityChanged(this, changedProps, false);
  // }

  connectedCallback(): void {
    super.connectedCallback();
    this._setCollectionDays();
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass) {
      return html``;
    }

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this._config.show_warning) {
      return html`
        <ha-card>
          <div class="warning">
            ${localize('common.show_warning')}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card
        .header=${this._config.name}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this._config.hold_action),
          hasDoubleClick: hasAction(this._config.double_tap_action),
        })}
        tabindex="0"
        aria-label=${`SPU trash collection: ${this._config.entity}`}
      >
        <div class="trash-collection-card">
          <table class="trash-collection-card__table">
            <thead>
              <tr>
                ${this.collectionDaysInfo.map(({ icon }) => {
                  return html`
                    <th><ha-icon class="trash-collection-card__icon" id=${icon} icon="mdi:${icon}" /></th>
                  `;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                ${this.collectionDaysInfo.map(({ nextCollectionDateString }) => {
                  return html`
                    <td>${nextCollectionDateString || '-'}</td>
                  `;
                })}
              </tr>
              <tr>
                ${this.collectionDaysInfo.map(({ daysUntilCollectionDay }) => {
                  return html`
                    <td>
                      ${daysUntilCollectionDay === 0 ? 'Today' : `in ${daysUntilCollectionDay}days`}
                    </td>
                  `;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </ha-card>
    `;
  }

  private _setCollectionDays(): void {
    if (this._config && this.hass) {
      this.collectionDaysInfo = getCollectionDaysInfo(this._config.collection_days, this.hass);
    }
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this._config && ev.detail.action) {
      handleAction(this, this.hass, this._config, ev.detail.action);
    }
  }

  static get styles(): CSSResult {
    return css`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
      :host {
        font-family: 'Roboto', sans-serif;
      }
      .trash-collection-card {
        width: 100%;
        padding: 0 25px 25px 25px;
        box-sizing: border-box;
        background: #eceff4;
        color: #2e3440;
        border-radius: 5px;
      }
      .trash-collection-card__table {
        width: 100%;
        font-size: 16px;
      }
      .trash-collection-card__icon {
        width: 30px;
        height: 30px;
        margin: 0 10px;
      }
      th {
        text-align: center;
        height: 50px;
      }
      td {
        text-align: center;
        height: 25px;
      }
    `;
  }
}
