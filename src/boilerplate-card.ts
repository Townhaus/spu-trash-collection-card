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

import { BoilerplateCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';

import { localize } from './localize/localize';

import { COLLECTION_TYPES } from './lib/appConstants';
import { getNexCollectiontDay, getDaysUntilDate, fetchCollectionDays } from './lib/collectionDaysHelpers.js';
import { CollectionDay } from './types/';

/* eslint no-console: 0 */
console.info(
  `%c  BOILERPLATE-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// TODO Name your custom element
@customElement('boilerplate-card')
export class BoilerplateCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('boilerplate-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): object {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  @property() public hass?: HomeAssistant;
  @property() private _config?: BoilerplateCardConfig;
  @property() public collectionDays: CollectionDay[] = [];
  @property() private nextCompostCollectionDay = '';
  @property() private nextGarbageCollectionDay = '';
  @property() private nextRecyclingCollectionDay = '';
  @property() private daysUntilCompost = 0;
  @property() private daysUntilGarbage = 0;
  @property() private daysUntilRecycling = 0;

  public setConfig(config: BoilerplateCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config || config.show_error) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this._config = {
      name: 'Boilerplate',
      ...config,
    };
  }

  // protected shouldUpdate(changedProps: PropertyValues): boolean {
  //   return hasConfigOrEntityChanged(this, changedProps, false);
  // }

  connectedCallback(): void {
    super.connectedCallback();
    this._fetchCollectionDays();
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
        aria-label=${`Boilerplate: ${this._config.entity}`}
      >
        <div class="trash-collection-card">
          <table class="trash-collection-card__table">
            <thead>
              <tr>
                <th><ha-icon id="lock" icon="mdi:leaf" /></th>
                <th><ha-icon id="lock" icon="mdi:delete" /></th>
                <th><ha-icon id="lock" icon="mdi:recycle" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${this.nextCompostCollectionDay || '-'}</td>
                <td>${this.nextGarbageCollectionDay || '-'}</td>
                <td>${this.nextRecyclingCollectionDay || '-'}</td>
              </tr>
              <tr>
                <td>in ${this.daysUntilCompost || '-'} days</td>
                <td>in ${this.daysUntilGarbage || '-'} days</td>
                <td>in ${this.daysUntilRecycling || '-'} days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ha-card>
    `;
  }

  private _fetchCollectionDays(): void {
    if (this._config) {
      const { address } = this._config;
      fetchCollectionDays(address)
        .then((collectionDays) => {
          const { COMPOST, GARBAGE, RECYCLING } = COLLECTION_TYPES;
          this.collectionDays = collectionDays;
          this.nextCompostCollectionDay = getNexCollectiontDay(this.collectionDays, COMPOST);
          this.nextGarbageCollectionDay = getNexCollectiontDay(this.collectionDays, GARBAGE);
          this.nextRecyclingCollectionDay = getNexCollectiontDay(this.collectionDays, RECYCLING);
          this.daysUntilCompost = getDaysUntilDate(this.nextCompostCollectionDay);
          this.daysUntilGarbage = getDaysUntilDate(this.nextGarbageCollectionDay);
          this.daysUntilRecycling = getDaysUntilDate(this.nextRecyclingCollectionDay);
        })
        .catch((e) => {
          console.log(e);
        });
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
      th,
      td {
        border-bottom: #2e3440 1px solid;
        text-align: center;
        height: 50px;
      }
    `;
  }
}
