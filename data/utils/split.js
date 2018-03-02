const changeCase = require("change-case");

module.exports = {
  inventory     : splitInventory,
  itemTemplates : splitItemTemplates,
}

function splitInventory(inventory) {
  // TODO
  return {};
}

function splitItemTemplates(templates) {
  if (!templates || !templates.item_templates) return {};

  const ret = {
      pokemon_settings         : [],
      item_settings            : [],
      move_settings            : [],
      type_settings            : [],
      move_sequence_settings   : [],
      type_effective_settings  : [],
      badge_settings           : [],
      camera_settings          : null,
      player_level_settings    : null,
      gym_level_settings       : null,
      battle_settings          : null,
      encounter_settings       : null,
      iap_item_display         : [],
      iap_settings             : null,
      pokemon_upgrade_settings : null,
      equipped_badge_settings  : null
  };

  for (let template of templates.item_templates) {
  // templates.item_templates.forEach(template => {
    const id        = template.template_id;
    const typeRegex = /^POKEMON_TYPE_(.*)/;
    if (template.pokemon_settings) {
      ret.pokemon_settings.push(template.pokemon_settings);
    } else if (template.item_settings) {
      ret.item_settings.push(template.item_settings);
    } else if (template.move_settings) {
      ret.move_settings.push(template.move_settings);
    } else if (template.move_sequence_settings) {
      ret.move_sequence_settings.push(template.move_sequence_settings.sequence);
    // } else if (template.type_effective) {
    //   ret.type_effective_settings.push(template.type_effective);
    } else if (template.badge_settings) {
      ret.badge_settings.push(template.badge_settings);
    } else if (template.camera) {
      ret.camera_settings = template.camera;
    } else if (template.player_level) {
      ret.player_level_settings = template.player_level;
    } else if (template.gym_level) {
      ret.gym_level_settings = template.gym_level;
    } else if (template.battle_settings) {
      ret.battle_settings = template.battle_settings;
    } else if (template.encounter_settings) {
      ret.encounter_settings = template.encounter_settings;
    } else if (template.iap_item_display) {
      ret.iap_item_display.push(template.iap_item_display);
    } else if (template.iap_settings) {
      ret.iap_settings = template.iap_settings;
    } else if (template.pokemon_upgrades) {
      ret.pokemon_upgrade_settings = template.pokemon_upgrades;
    } else if (template.equipped_badges) {
      ret.equipped_badge_settings = template.equipped_badges;
    } else if (typeRegex.test(id)) {
      let type = template.type_effective;
      type.identifier = typeRegex.exec(id)[1].toLowerCase().replace('_', '');
      type.name = changeCase.titleCase(type.identifier);
      ret.type_settings.push(type);
    }
  }

  return ret;
}
