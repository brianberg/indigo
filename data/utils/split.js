const changeCase = require("change-case");

module.exports = {
  inventory     : splitInventory,
  itemTemplates : splitItemTemplates,
}

function splitInventory(inventory) {
  const ret = {
    pokemon            : [],
    removed_pokemon    : [],
    items              : [],
    pokedex            : {},
    player             : null,
    currency           : [],
    camera             : null,
    inventory_upgrades : [],
    applied_items      : [],
    egg_incubators     : [],
    candies            : [],
    quests             : []
  };

  if (!inventory || !inventory.inventory_delta ||
      !inventory.inventory_delta.inventory_items) {
    return ret;
  }

  for (let item of inventory.inventory_delta.inventory_items) {
    if (item.inventory_item_data) {
      const data = item.inventory_item_data;
      if (data.pokemon_data) {
        ret.pokemon.push(data.pokemon_data);
      }
      if (data.item) {
        ret.items.push(data.item);
      }
      if (data.pokedex_entry) {
        const entry = data.pokedex_entry;
        ret.pokedex[entry.pokemon_id] = entry;
      }
      if (data.player_stats) {
        ret.player = data.player_stats;
      }
      if (data.player_currency) {
        ret.currency.push(data.player_currency);
      }
      if (data.player_camera) {
        ret.camera = data.player_camera;
      }
      if (data.inventory_upgrades) {
        ret.inventory_upgrades.push(data.inventory_upgrades);
      }
      if (data.applied_items) {
        ret.applied_items.push(data.applied_items);
      }
      if (data.egg_incubators) {
        const incubators = data.egg_incubators.egg_incubator || [];
        ret.egg_incubators = ret.egg_incubators.concat(incubators);
      }
      if (data.candy) {
        ret.candies.push(data.candy);
      }
      if (data.quest) {
        ret.quests.push(data.quest);
      }
    }
    if (item.deleted_item && item.deleted_item.pokemon_id) {
      ret.removed_pokemon.push(item.deleted_item.pokemon_id);
    }
  }
  return ret;
}

function splitItemTemplates(templates) {

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
  
  if (!templates || !templates.item_templates) return {};

  for (let template of templates.item_templates) {
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
