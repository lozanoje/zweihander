import ZweihanderBaseItem from './base-item';

export default class ZweihanderInjury extends ZweihanderBaseItem {
  async _preCreate(item, options, user, that) {
    await super._preCreate(item, options, user);

    if (that.actor && item?.system?.recuperationTime === 0) {
      const d = Number(item.system.severity) + 1;
      const roll = await new Roll(`${d}d10+${d}`).evaluate();
      const speaker = ChatMessage.getSpeaker({ actor: that.actor });
      await roll.toMessage({ flavor: game.i18n.localize('ZWEI.othermessages.recuperationtime'), speaker });
      that.updateSource({ 'system.recuperationTime': roll.total });
    }
  }
}
