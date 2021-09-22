#!/usr/bin/env python
""" Outputs Civilization information for arabia.js."""
from argparse import ArgumentParser
from collections import Counter, defaultdict
import json
from pathlib import Path
import re

TECHTREE_PATH = Path("~/opensrc/aoe2techtree/data").expanduser()

UU_PATTERN = re.compile(".*?unique (unit)?(.*?([^ ]+|.*unit)[^.]+)")

BUILDINGS = {
    "ARCHERY_RANGE": {
        "PRESENT_UNITS": (
            ("CROSSBOWMAN", "ARBALESTER",),
            ("SLINGER",),
            ("IMPERIAL_SKIRMISHER",),
            ("CAVALRY_ARCHER", "HEAVY_CAV_ARCHER",),
            ("HAND_CANNONEER",),
            ("GENITOUR",),
        ),
        "MISSING_UNITS": ("CROSSBOWMAN", "ELITE_SKIRMISHER",),
        "ARMOR": ("PADDED_ARCHER_ARMOR", "LEATHER_ARCHER_ARMOR", "RING_ARCHER_ARMOR",),
        "ATTACK": ("FLETCHING", "BODKIN_ARROW", "BRACER",),
        "MISSING_TECHS": (
            "THUMB_RING",
            "BLOODLINES",
            "HUSBANDRY",
            "BALLISTICS",
            "CHEMISTRY",
        ),
        "PRESENT_TECHS": ("PARTHIAN_TACTICS",),
    },
    "STABLE": {
        "PRESENT_UNITS": (
            ("LIGHT_CAVALRY", "HUSSAR", "WINGED_HUSSAR",),
            ("KNIGHT", "CAVALIER", "PALADIN",),
            ("CAMEL_RIDER", "IMPERIAL_CAMEL_RIDER",),
            ("BATTLE_ELEPHANT",),
            ("STEPPE_LANCER",),
        ),
        "MISSING_UNITS": ("KNIGHT", "LIGHT_CAVALRY",),
        "ARMOR": ("SCALE_BARDING_ARMOR", "CHAIN_BARDING_ARMOR", "PLATE_BARDING_ARMOR",),
        "ATTACK": ("FORGING", "IRON_CASTING", "BLAST_FURNACE",),
        "MISSING_TECHS": ("BLOODLINES", "HUSBANDRY",),
        "PRESENT_TECHS": (),
    },
    "BARRACKS": {
        "PRESENT_UNITS": (
            ("TWO_HANDED_SWORDSMAN", "CHAMPION",),
            ("PIKEMAN", "HALBERDIER",),
            ("EAGLE_WARRIOR",),
            ("CONDOTTIERO",),
        ),
        "MISSING_UNITS": ("PIKEMAN", "TWO_HANDED_SWORDSMAN",),
        "ARMOR": ("SCALE_MAIL_ARMOR", "CHAIN_MAIL_ARMOR", "PLATE_MAIL_ARMOR",),
        "ATTACK": ("FORGING", "IRON_CASTING", "BLAST_FURNACE",),
        "MISSING_TECHS": ("SQUIRES", "ARSON", "SUPPLIES",),
        "PRESENT_TECHS": (),
    },
    "SIEGE_WORKSHOP": {
        "PRESENT_UNITS": (
            ("BATTERING_RAM", "CAPPED_RAM", "SIEGE_RAM",),
            ("MANGONEL", "ONAGER", "SIEGE_ONAGER",),
            ("SCORPION", "HEAVY_SCORPION",),
            ("BOMBARD_CANNON", "HOUFNICE",),
        ),
        "MISSING_UNITS": ("SIEGE_TOWER",),
        "ARMOR": (),
        "ATTACK": (),
        "MISSING_TECHS": (),
        "PRESENT_TECHS": ("SIEGE_ENGINEERS",),
    },
}

CIV_UNIT_BONUSES = {
    "Aztecs": {
        "CROSSBOWMAN": 0.11,
        "IMPERIAL_SKIRMISHER": 1.11,
        "TWO_HANDED_SWORDSMAN": 4.11,
        "PIKEMAN": 4.11,
        "EAGLE_WARRIOR": 4.11,
        "BATTERING_RAM": 0.11,
        "MANGONEL": 0.11,
        "SCORPION": 0.11,
    },
    "Berbers": {"KNIGHT": 0.2, "LIGHT_CAVALRY": 0.2, "CAMEL_RIDER": 1.2},
    "Bohemians": {
        "CROSSBOWMAN": 0.5,
        "IMPERIAL_SKIRMISHER": 0.5,
        "HAND_CANNONEER": 1.5,
        "PIKEMAN": 0.12,
    },
    "Britons": {"CROSSBOWMAN": 1.7, "IMPERIAL_SKIRMISHER": 0.7, "TREBUCHET": 1},
    "Bulgarians": {"KNIGHT": 0.33, "LIGHT_CAVALRY": 0.33, "TWO_HANDED_SWORDSMAN": 2.5},
    "Burgundians": {"KNIGHT": 1, "BOMBARD_CANNON": 0.25, "HAND_CANNONEER": 0.25},
    "Burmese": {
        "KNIGHT": 0.6,
        "LIGHT_CAVALRY": 0.6,
        "BATTLE_ELEPHANT": 1.6,
        "TWO_HANDED_SWORDSMAN": 3.0,
        "PIKEMAN": 3.0,
    },
    "Byzantines": {"CAMEL_RIDER": 0.25, "IMPERIAL_SKIRMISHER": 0.25, "PIKEMAN": 0.25},
    "Celts": {
        "TWO_HANDED_SWORDSMAN": 0.03,
        "PIKEMAN": 0.03,
        "BATTERING_RAM": 2.25,
        "MANGONEL": 2.25,
        "SCORPION": 2.25,
    },
    "Chinese": {"SCORPION": 2.0,},
    "Cumans": {
        "KNIGHT": 0.03,
        "LIGHT_CAVALRY": 0.53,
        "STEPPE_LANCER": 0.53,
        "HEAVY_CAV_ARCHER": 0.53,
        "BATTERING_RAM": 2.0,
    },
    "Ethiopians": {"CROSSBOWMAN": 0.18, "MANGONEL": 0.25, "BOMBARD_CANNON": 0.25},
    "Franks": {"KNIGHT": 2.2, "LIGHT_CAVALRY": 2.2},
    "Goths": {"TWO_HANDED_SWORDSMAN": 1.65, "PIKEMAN": 1.65},
    "Huns": {
        "KNIGHT": 0.2,
        "LIGHT_CAVALRY": 0.2,
        "HEAVY_CAV_ARCHER": 0.2,
        "TREBUCHET": 2,
    },
    "Incas": {"IMPERIAL_SKIRMISHER": 0.5, "EAGLE_WARRIOR": 1},
    "Indians": {"LIGHT_CAVALRY": 1.0, "CAMEL_RIDER": 1.4, "HAND_CANNONEER": 0.5},
    "Italians": {"HAND_CANNONEER": 0.2, "BOMBARD_CANNON": 0.2},
    "Japanese": {"TWO_HANDED_SWORDSMAN": 0.33, "PIKEMAN": 0.33, "TREBUCHET": 1},
    "Khmer": {"BATTLE_ELEPHANT": 3.01, "SCORPION": 10.5},
    "Koreans": {
        "CROSSBOWMAN": 0.1,
        "IMPERIAL_SKIRMISHER": 0.1,
        "HEAVY_CAV_ARCHER": 0.1,
        "MANGONEL": 1.16,
    },
    "Lithuanians": {"PIKEMAN": 0.51, "KNIGHT": 2, "IMPERIAL_SKIRMISHER": 0.5},
    "Magyars": {
        "LIGHT_CAVALRY": 0.15,
        "HEAVY_CAV_ARCHER": 1,
        "CROSSBOWMAN": 0.2,
        "IMPERIAL_SKIRMISHER": 0.2,
    },
    "Malay": {"BATTLE_ELEPHANT": 0.4, "TWO_HANDED_SWORDSMAN": 1},
    "Malians": {
        "KNIGHT": 5.0,
        "LIGHT_CAVALRY": 5.0,
        "CAMEL_RIDER": 5.0,
        "TWO_HANDED_SWORDSMAN": 3.0,
        "PIKEMAN": 3.0,
    },
    "Mayans": {"CROSSBOWMAN": 0.3, "IMPERIAL_SKIRMISHER": 0.8, "EAGLE_WARRIOR": 5},
    "Mongols": {
        "LIGHT_CAVALRY": 1.9,
        "STEPPE_LANCER": 1.9,
        "HEAVY_CAV_ARCHER": 0.25,
        "MANGONEL": 0.5,
        "SCORPION": 0.5,
        "BATTERING_RAM": 0.5,
    },
    "Persians": {"KNIGHT": 2, "CROSSBOWMAN": 1},
    "Poles": {"KNIGHT": 1, "LIGHT_CAVALRY": 1.25},
    "Portuguese": {
        "KNIGHT": 0.1,
        "CROSSBOWMAN": 0.1,
        "HEAVY_CAV_ARCHER": 0.1,
        "HAND_CANNONEER": 1.1,
        "TWO_HANDED_SWORDSMAN": 0.1,
        "MANGONEL": 0.1,
        "SCORPION": 0.1,
        "TREBUCHET": 0.1,
        "BOMBARD_CANNON": 1.1,
        "BATTERING_RAM": 0.1,
    },
    "Saracens": {"CROSSBOWMAN": 0.2, "CAMEL_RIDER": 1.5},
    "Sicilians": {"KNIGHT": 3, "LIGHT_CAVALRY": 2.0, "CROSSBOWMAN": 2.0},
    "Slavs": {
        "TWO_HANDED_SWORDSMAN": 0.25,
        "PIKEMAN": 0.25,
        "MANGONEL": 0.15,
        "SCORPION": 0.15,
        "BATTERING_RAM": 0.15,
    },
    "Spanish": {"HAND_CANNONEER": 0.18},
    "Tatars": {
        "LIGHT_CAVALRY": 1.1,
        "KNIGHT": 0.1,
        "CAMEL_RIDER": 0.1,
        "STEPPE_LANCER": 1.1,
        "HEAVY_CAV_ARCHER": 1.65,
        "CROSSBOWMAN": 0.25,
        "IMPERIAL_SKIRMISHER": 0.25,
        "HAND_CANNONEER": 0.25,
        "TWO_HANDED_SWORDSMAN": 0.1,
        "PIKEMAN": 0.1,
        "SCORPION": 0.25,
        "MANGONEL": 0.25,
        "TREBUCHET": 1.25,
        "BATTERING_RAM": 0.1,
    },
    "Teutons": {
        "KNIGHT": 2.0,
        "TWO_HANDED_SWORDSMAN": 2.0,
        "PIKEMAN": 2.0,
        "MANGONEL": 1.0,
        "SCORPION": 1.0,
        "TREBUCHET": 1.0,
        "BOMBARD_CANNON": 1.0,
        "BATTERING_RAM": 1.0,
    },
    "Turks": {
        "LIGHT_CAVALRY": 0.5,
        "HEAVY_CAV_ARCHER": 1.5,
        "HAND_CANNONEER": 1.25,
        "BOMBARD_CANNON": 2.25,
    },
    "Vietnamese": {
        "BATTLE_ELEPHANT": 2.0,
        "HEAVY_CAV_ARCHER": 1.5,
        "CROSSBOWMAN": 1.5,
        "IMPERIAL_SKIRMISHER": 1.5,
    },
    "Vikings": {"TWO_HANDED_SWORDSMAN": 4.0, "PIKEMAN": 4.0},
}


class Civilization:
    """ Holds buildings, techs, and unit codes for given civilization."""

    def __init__(self, name, block, dependency_manager):
        self.name = name
        self.buildings = block["buildings"]
        self.techs = block["techs"]
        self.unique = block["unique"]
        self.units = block["units"]
        self.key_lookup = dependency_manager.constant_lookup
        self.building_from_tech = dependency_manager.building_lookups
        self.calculated_units = None

    @property
    def unique_techs(self):
        """ Returns keys for unique techs. """
        return (
            self.unique["castleAgeUniqueTech"],
            self.unique["imperialAgeUniqueTech"],
        )

    @property
    def unique_unit(self):
        """ Returns data key for unique unit."""
        return self.unique["castleAgeUniqueUnit"]

    def verify_building(self, building):
        """ Makes sure building is available to civ."""
        key = int(self.key_lookup[building])
        return key in self.buildings

    def verify_tech(self, tech):
        """ Makes sure has access to the building for the tech."""
        return self.verify_building(self.building_from_tech[tech])

    def building_data(self, building):
        """ Returns dictionary of data about units produced
in a given building and their associated techs."""
        if not self.verify_building(building):
            return None
        data = defaultdict(list)
        info = BUILDINGS[building]
        for units in info["PRESENT_UNITS"]:
            for unit in reversed(units):
                key = self.key_lookup[unit]
                if key in self.units:
                    data["units"].append(key)
                    break
        for unit in info["MISSING_UNITS"]:
            key = self.key_lookup[unit]
            if key not in self.units:
                data["units"].append(-1 * key)
        if info["ATTACK"] and info["ARMOR"]:
            attack = 0
            for tech in info["ATTACK"]:
                key = self.key_lookup[tech]
                if key in self.techs:
                    attack += 1
            data["blacksmith_techs"].append(attack)
            armor = 0
            for tech in info["ARMOR"]:
                key = self.key_lookup[tech]
                if key in self.techs:
                    armor += 1
            data["blacksmith_techs"].append(armor)
        for tech in info["PRESENT_TECHS"]:
            if not self.verify_tech(tech):
                continue
            key = self.key_lookup[tech]
            if key in self.techs:
                data["techs"].append(key)
                break
        for tech in info["MISSING_TECHS"]:
            if not self.verify_tech(tech):
                continue
            key = self.key_lookup[tech]
            if key not in self.techs:
                data["techs"].append(-1 * key)
        return data

    def calculate_unit_value(self):
        """ Calculate the value of the given units in a civ."""
        if self.calculated_units:
            return self.calculated_units

        lookup = self.key_lookup
        values = defaultdict(float)
        range_units = [
            "CROSSBOWMAN",
            "IMPERIAL_SKIRMISHER",
        ]
        stable = self.verify_building("STABLE")
        # Stable
        if stable:
            info = self.building_data("STABLE")
            stable_units = []
            if -1 * lookup["KNIGHT"] not in info["units"]:
                stable_units.append("KNIGHT")
            if lookup["KNIGHT"] in info["units"]:
                values["KNIGHT"] -= 2.5
            if lookup["PALADIN"] in info["units"]:
                values["KNIGHT"] += 3.6
            if -1 * lookup["LIGHT_CAVALRY"] not in info["units"]:
                stable_units.append("LIGHT_CAVALRY")
            if lookup["HUSSAR"] in info["units"]:
                values["LIGHT_CAVALRY"] += 1
            if lookup["WINGED_HUSSAR"] in info["units"]:
                values["LIGHT_CAVALRY"] += 4
            if lookup["CAMEL_RIDER"] in info["units"]:
                stable_units.append("CAMEL_RIDER")
            if lookup["IMPERIAL_CAMEL_RIDER"] in info["units"]:
                stable_units.append("CAMEL_RIDER")
                values["CAMEL_RIDER"] += 2.8
            if lookup["BATTLE_ELEPHANT"] in info["units"]:
                stable_units.append("BATTLE_ELEPHANT")
            if lookup["STEPPE_LANCER"] in info["units"]:
                stable_units.append("STEPPE_LANCER")
            for unit in stable_units:
                for tech in info["blacksmith_techs"]:
                    values[unit] += tech - 2
                if -1 * lookup["BLOODLINES"] in info["techs"]:
                    values[unit] -= 1
                if -1 * lookup["HUSBANDRY"] in info["techs"]:
                    values[unit] -= 0.1

        # Range
        info = self.building_data("ARCHERY_RANGE")
        if stable:
            range_units.append("HEAVY_CAV_ARCHER")
            if lookup["HEAVY_CAV_ARCHER"] in info["units"]:
                values["HEAVY_CAV_ARCHER"] += 2
            if -1 * lookup["BLOODLINES"] in info["techs"]:
                values["HEAVY_CAV_ARCHER"] -= 1
            if -1 * lookup["HUSBANDRY"] in info["techs"]:
                values["HEAVY_CAV_ARCHER"] -= 0.1
            if lookup["PARTHIAN_TACTICS"] in info["techs"]:
                values["HEAVY_CAV_ARCHER"] += 1.5

        if lookup["ARBALESTER"] in info["units"]:
            values["CROSSBOWMAN"] += 1.5
        if -1 * lookup["CROSSBOWMAN"] in info["units"]:
            values["CROSSBOWMAN"] -= 2.0
        if lookup["IMPERIAL_SKIRMISHER"] in info["units"]:
            values["IMPERIAL_SKIRMISHER"] += 1
        if -1 * lookup["ELITE_SKIRMISHER"] in info["units"]:
            values["IMPERIAL_SKIRMISHER"] -= 2.0
        for unit in range_units:
            for tech in info["blacksmith_techs"]:
                values[unit] += tech - 2
            if -1 * lookup["THUMB_RING"] in info["techs"]:
                values[unit] -= 1
        # HC
        if lookup["HAND_CANNONEER"] in info["units"]:
            values["HAND_CANNONEER"] += info["blacksmith_techs"][1] - 2

        # Barracks
        info = self.building_data("BARRACKS")
        barracks_units = ["TWO_HANDED_SWORDSMAN", "PIKEMAN"]
        if lookup["EAGLE_WARRIOR"] in info["units"]:
            barracks_units.append("EAGLE_WARRIOR")
        if lookup["CHAMPION"] in info["units"]:
            values["TWO_HANDED_SWORDSMAN"] += 2.6
        if -1 * lookup["TWO_HANDED_SWORDSMAN"] in info["units"]:
            values["TWO_HANDED_SWORDSMAN"] -= 3
        if -1 * lookup["SUPPLIES"] in info["techs"]:
            values["TWO_HANDED_SWORDSMAN"] -= 0.15
        if lookup["HALBERDIER"] in info["units"]:
            values["PIKEMAN"] += 2.6
        if -1 * lookup["PIKEMAN"] in info["units"]:
            values["PIKEMAN"] -= 2.2
        for unit in barracks_units:
            for tech in info["blacksmith_techs"]:
                values[unit] += tech - 2
            if -1 * lookup["SQUIRES"] in info["techs"]:
                values[unit] -= 0.1

        # Siege
        info = self.building_data("SIEGE_WORKSHOP")
        siege_units = [
            "MANGONEL",
            "SCORPION",
            "TREBUCHET",
        ]
        if lookup["BOMBARD_CANNON"] in info["units"]:
            siege_units.append("BOMBARD_CANNON")
        if lookup["MANGONEL"] in info["units"]:
            values["MANGONEL"] -= 2.3
        if lookup["SIEGE_ONAGER"] in info["units"]:
            values["MANGONEL"] += 2.6
        if lookup["HEAVY_SCORPION"] in info["units"]:
            values["SCORPION"] += 3.25
        for unit in siege_units:
            values[unit] += 0
            if lookup["SIEGE_ENGINEERS"] in info["techs"]:
                values[unit] += 1
        siege_units.append("BATTERING_RAM")
        values["BATTERING_RAM"] = 0
        if lookup["BATTERING_RAM"] in info["units"]:
            values["BATTERING_RAM"] -= 1.2
        if lookup["SIEGE_RAM"] in info["units"]:
            values["BATTERING_RAM"] += 2.75
        try:
            for unit, bonus in CIV_UNIT_BONUSES[self.name].items():
                values[unit] += bonus
        except KeyError:
            pass
        self.calculated_units = values
        return values


class CivilizationManager:
    """ Gathers all information for each civ."""

    def __init__(self):
        self.dependency_manager = DependencyManager()
        self.dependency_manager.load()
        self.civilizations = {}
        with open(TECHTREE_PATH / "data.json") as fobj:
            self.data = json.load(fobj)
        with open(TECHTREE_PATH / "locales" / "en" / "strings.json") as fobj:
            self.strings = json.load(fobj)
        self.unit_counts = defaultdict(int)
        self.categorized_units = None
        self.rare_units = None

    def load_civs(self, civ_name=None):
        """ Load all civilizations."""
        if civ_name:
            self.load_civ(civ_name)
        else:
            for _civ_name in self.data["techtrees"]:
                self.load_civ(_civ_name)

    def load_civ(self, civ_name):
        """ Create civ with given name. """
        for _civ_name, civ_data in self.data["techtrees"].items():
            if civ_name == _civ_name:
                civ = Civilization(civ_name, civ_data, self.dependency_manager)
                self.civilizations[civ_name] = civ
                for unit in civ.units:
                    self.unit_counts[unit] += 1
                return civ
        return None

    def display_bonuses(self):
        """ Display civ bonuses to help evaluate units."""
        for civ_name in self.civilizations:
            print("*" * len(civ_name))
            print(civ_name)
            print("*" * len(civ_name))
            for info in self.building_info(civ_name).values():
                for items in info.values():
                    for item in items:
                        print(item)

    def calculate_unit_values(self, civ_name=None):
        """Calculates unit values for one or more civs"""
        civ_unit_values = {}
        for _civ_name in self.civilizations:
            if civ_name and _civ_name != civ_name:
                continue
            civ = self.civilizations[_civ_name]
            civ_unit_values[_civ_name] = civ.calculate_unit_value()
        return civ_unit_values

    def display_civs(self):
        """ Call display civ on all loaded civs."""
        for civ_name in self.civilizations:
            print("*" * len(civ_name))
            print(civ_name)
            print("*" * len(civ_name))
            self.display_civ(civ_name)

    def tech_info(self, civ_name):
        """ List of unique techs for civ."""

        civ = self.civilizations[civ_name]
        techs = civ.unique_techs
        info = []
        for tech in techs:
            tech_key = self.data["data"]["techs"][str(tech)]
            name_key = tech_key["LanguageNameId"]
            help_key = tech_key["LanguageHelpId"]
            name_text = self.strings[str(name_key)]
            _, help_text = self.strings[str(help_key)].split("\n")
            info.append("{}: {}".format(name_text, help_text))
        return info

    def bonuses(self, civ_name):
        """ List of civ bonus strings."""
        help_key = self.data["civ_helptexts"][civ_name]
        lines = []
        start_unique = False
        start_team = False
        for line in self.strings[help_key].split("<br>")[2:]:
            if start_team:
                lines.append(line[1:])
                continue
            if line.startswith("\n• ") and not start_unique:
                lines.append(line[3:])
            if line.startswith("\n<b>Unique Techs"):
                start_unique = True
            if line.startswith("\n<b>Team Bonus"):
                start_team = True
        return lines

    def unique_unit(self, civ_name):
        """ Name of unique unit for civ."""
        civ = self.civilizations[civ_name]
        uu_key = self.data["data"]["units"][str(civ.unique_unit)]
        name_key = uu_key["LanguageNameId"]
        name = self.strings[str(name_key)]
        help_key = uu_key["LanguageHelpId"]
        _, help_info = self.strings[str(help_key)].split("\n", 1)
        m = UU_PATTERN.match(
            help_info.replace(" vs. ", " vs ").replace("unit.", "unit")
        )
        if m:
            return "{}: {}".format(name, m.group(2).lower().strip())
        return name

    def name_for_key(self, key, category):
        """ Utility for getting name for a key in a category."""
        info = self.data["data"][category][str(key)]
        name_key = info["LanguageNameId"]
        return self.strings[str(name_key)]

    def name_for_string_key(self, key):
        """ Utility for getting name for string key."""
        int_key = self.dependency_manager.constant_lookup[key]
        return self.name_for_key(int_key, "units")

    def building_info(self, civ_name):
        """ Returns info for building in a civ."""
        civ = self.civilizations[civ_name]
        infos = {}
        for building in BUILDINGS:
            civ_info = civ.building_data(building)
            if civ_info:
                data = defaultdict(list)
                building_key = self.dependency_manager.constant_lookup[building]
                for key, value in civ_info.items():
                    if key == "blacksmith_techs":
                        data["techs"].append("Attack: {}, Armor: {}".format(*value))
                        continue
                    category = "units" if "unit" in key else "techs"
                    for item in value:
                        name = self.name_for_key(abs(item), category)
                        if item < 0:
                            name = "MISSING {}".format(name)
                        data[key].append(name)

                infos[self.name_for_key(building_key, "buildings")] = data
        return infos

    def display_civ(self, civ_name):
        """ Displays civ info"""
        print(self.bonuses(civ_name))
        print(self.tech_info(civ_name))
        print(self.unique_unit(civ_name))
        for building, info in self.building_info(civ_name).items():
            print(building)
            for title, items in info.items():
                print("{}: {}".format(title, ", ".join(items)))

    def js_civs(self, civ_name=None):
        """ Call js civ on all loaded civs."""
        for _civ_name in self.civilizations:
            if civ_name and _civ_name != civ_name:
                continue
            print("*" * len(_civ_name))
            print(_civ_name)
            print("*" * len(_civ_name))
            self.js_civ(_civ_name)
            print()

    def js_civ(self, civ_name):
        """ Displays javascript for arabia.js for civ"""
        print('        bonuses: "{}",'.format("<br>".join(self.bonuses(civ_name))))
        print(
            '        uniques: "{}<br><br>{}",'.format(
                self.unique_unit(civ_name), "<br>".join(self.tech_info(civ_name))
            )
        )
        print(
            '        production: "{}",'.format(
                "<br>".join(self.production_lines(civ_name))
            )
        )

    def ranked_units(self):
        """ Builds dictionary of civname:unit-ranks."""
        unit_civ_strengths = defaultdict(Counter)
        for civ, unit_strengths in self.calculate_unit_values().items():
            for unit, strength in unit_strengths.items():
                unit_civ_strengths[unit][civ] = strength
        civ_ranks = defaultdict(Counter)
        subunit_lookup = {}
        for unit, civ_strengths in unit_civ_strengths.items():
            if unit in subunit_lookup:
                subunits = subunit_lookup[unit]
            else:
                for category in BUILDINGS.values():
                    useful = category["PRESENT_UNITS"]
                    for unit_set in useful:
                        if unit in unit_set:
                            subunit_lookup[unit] = unit_set
                            subunits = unit_set
                            break
            last_rank = 0
            last_strength = 0
            for idx, civ_strength in enumerate(civ_strengths.most_common(), 1):
                name, strength = civ_strength
                if strength != last_strength:
                    last_rank = idx
                    last_strength = strength
                for subunit in subunits:
                    civ_ranks[name][self.name_for_string_key(subunit)] = last_rank
        return civ_ranks

    def production_lines(self, civ_name):
        """ List of production lines for civ. Add ranks where appropriate"""
        lines = []
        for building, info in self.building_info(civ_name).items():
            lines.append("<b>{}</b>".format(building))
            if info["techs"]:
                lines.append(", ".join(info["techs"]))
            lines.extend(info["units"])
        return lines

    def heuristics(self, key):
        """ Stuff for decisions. """
        units = Counter()
        for name, civ_data in self.data["techtrees"].items():
            for unit in civ_data[key]:
                units[unit] += 1

        for unit, cnt in units.most_common():
            unit_key = self.data["data"][key][str(unit)]["LanguageNameId"]
            unit_name = self.strings[str(unit_key)]
            print(unit_name, cnt)


class DependencyManager:
    """ Manages which techs and units belong to which building."""

    def __init__(self):
        self.buildings = defaultdict(set)
        self.constant_lookup = {}
        self.const_pattern = re.compile(r"const ([A-Z0-9_]+) = ([0-9]+)")
        self.pattern = re.compile(r"(b|u|t)\(([A-Z_]+)\), (u|t)\(([A-Z0-9_]+)")
        self.building_lookups = {}

    def load(self):
        """ Determine the dependencies."""
        in_connections = False
        # Some are missing from techtree.js
        self.building_lookups = {
            "SQUIRES": "BARRACKS",
            "PARTHIAN_TACTICS": "ARCHERY_RANGE",
            "KNIGHT": "STABLE",
            "FIRE_GALLEY": "DOCK",
            "TRADE_COG": "DOCK",
            "CANNON_GALLEON": "DOCK",
            "TURTLE_SHIP": "DOCK",
            "LONGBOAT": "DOCK",
            "CARAVEL": "DOCK",
            "BOMBARD_CANNON": "SIEGE_WORKSHOP",
            "GENITOUR": "ARCHERY_RANGE",
            "TOWN_WATCH": "TOWN_CENTER",
            "WHEELBARROW": "TOWN_CENTER",
            "SIEGE_ENGINEERS": "UNIVERSITY",
            "CHEMISTRY": "UNIVERSITY",
            "COINAGE": "MARKET",
        }

        for unit, building in self.building_lookups.items():
            self.buildings[building].add(unit)
        with open(TECHTREE_PATH / ".." / "js" / "techtree.js") as fobj:
            for line in fobj:
                const = self.const_pattern.match(line)
                if const:
                    key, value = const.groups()
                    self.constant_lookup[key] = int(value)
                if in_connections:
                    if ";" in line:
                        in_connections = False
                    m = self.pattern.search(line)
                    if m:
                        first_type, first, _, second = m.groups()
                        if first_type == "b":
                            self.building_lookups[second] = first
                            self.buildings[first].add(second)
                        else:
                            building = self.building_lookups[first]
                            self.building_lookups[second] = building
                            self.buildings[building].add(second)
                if "function getConnections()" in line:
                    in_connections = True

    def verify(self):
        """ Make sure all units and techs are accounted for."""
        # Not interesting, as civs with these always have all of them
        accounted = set(
            (
                "ARCHER",
                "SKIRMISHER",
                "SLINGER",
                "ELITE_GENITOUR",
                "MAN_AT_ARMS",
                "MILITIA",
                "SPEARMAN",
                "LONG_SWORDSMAN",
                "SCOUT_CAVALRY",
                "HEAVY_CAMEL_RIDER",
                "ELITE_STEPPE_LANCER",
                "XOLOTL_WARRIOR",
                "EAGLE_SCOUT",
                "ELITE_EAGLE_WARRIOR",
                "ELITE_BATTLE_ELEPHANT",
            )
        )
        potential = {tech for tech in self.buildings["BLACKSMITH"]}
        for building, keys in BUILDINGS.items():
            potential.update({unit for unit in self.buildings[building]})
            for unit_set in keys.values():
                for unit in unit_set:
                    if isinstance(unit, tuple):
                        accounted.update({subunit for subunit in unit})
                    else:
                        accounted.add(unit)
        missing = potential - accounted
        if missing:
            print("Missing: {}".format(", ".join(missing)))


def run(cname):
    """ Default thing to do."""
    c_m = CivilizationManager()
    c_m.load_civs(cname)
    c_m.display_civs()


def html(cname):
    """ Print out javascript for civ."""
    c_m = CivilizationManager()
    c_m.load_civs(cname)
    c_m.js_civs(cname)


def heuristics(key):
    """ Runs Civ Manager heuristics."""
    c_m = CivilizationManager()
    c_m.heuristics(key)


def bonuses():
    """ Show the bonuses."""
    c_m = CivilizationManager()
    c_m.load_civs()
    c_m.display_bonuses()


def unit_values(cname):
    """ Show the unit values of civ."""
    c_m = CivilizationManager()
    c_m.load_civs(cname)
    for civ, unit_values in c_m.ranked_units().items():
        print(civ, unit_values)
    # for name, units in c_m.calculate_unit_values(cname).items():
    #     print("*" * len(name))
    #     print(name)
    #     print("*" * len(name))
    #     print(units)


def units_ranked(unit_name):
    """ Print ranked list of civs by unit strength."""
    c_m = CivilizationManager()
    c_m.load_civs()
    unit_strengths = c_m.calculate_unit_values()
    civs = Counter()
    for civ, units in unit_strengths.items():
        if unit_name in units:
            civs[civ] = units[unit_name]
    last_rank = 0
    last_strength = 0
    for idx, pair in enumerate(civs.most_common(), 1):
        name, strength = pair
        if strength != last_strength:
            last_rank = idx
            last_strength = strength
        print("{:2}. {:15} {:5.2f}".format(last_rank, name, last_strength))


def verify():
    """ Runs dependency manager unit/tech verification."""
    dep = DependencyManager()
    dep.load()
    dep.verify()


def update_arabia(cname):
    """ Update bonus, unique, and production lines in arabia.js"""
    c_m = CivilizationManager()
    c_m.load_civs(cname)
    civ_template = "^ +{}:"
    bonuses_pattern = re.compile(r"^ +bonuses:")
    uniques_pattern = re.compile(r"^ +uniques:")
    production_pattern = re.compile(r"^ +production:")
    exit_civ_pattern = re.compile(r" +},")
    arabia_lines = []
    updates = {}
    with open("arabia.js") as f:
        for l in f:
            arabia_lines.append(l.rstrip())
    for name in c_m.civilizations:
        in_civ = False
        civ_pattern = re.compile(civ_template.format(name.lower()))
        for idx, line in enumerate(arabia_lines):
            if in_civ:
                m = bonuses_pattern.match(line)
                if m:
                    updates[idx] = '{} "{}",'.format(
                        m.group(0), "<br>".join(c_m.bonuses(name))
                    )
                m = uniques_pattern.match(line)
                if m:
                    updates[idx] = '{} "{}<br><br>{}",'.format(
                        m.group(0),
                        c_m.unique_unit(name),
                        "<br>".join(c_m.tech_info(name)),
                    )

                m = production_pattern.match(line)
                if m:
                    updates[idx] = '{} "{}",'.format(
                        m.group(0), "<br>".join(c_m.production_lines(name))
                    )
            if in_civ and exit_civ_pattern.match(line):
                print(idx)
                break
            if civ_pattern.match(line):
                print(idx)
                in_civ = True
                print(name)
    with open("arabia.js", "w") as f:
        for idx, line in enumerate(arabia_lines):
            if idx in updates:
                f.write(updates[idx])
            else:
                f.write(line)
            f.write("\n")


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "-heur", choices=("techs", "units",), help="Run heuristics with key"
    )
    parser.add_argument("-v", action="store_true", help="Run verify")
    parser.add_argument("-civ", type=str, help="Run for specific civ")
    parser.add_argument("-html", action="store_true", help="Display html")
    parser.add_argument("-bonuses", action="store_true", help="Display bonuses")
    parser.add_argument("-values", action="store_true", help="Display unit values")
    parser.add_argument("-best", help="Unit type to display ranked list of")
    parser.add_argument(
        "-update",
        action="store_true",
        help="Update arabia.js bonuses, uniques, and production lines",
    )
    args = parser.parse_args()
    if args.heur:
        heuristics(args.heur)
    elif args.v:
        verify()
    elif args.html:
        html(args.civ)
    elif args.bonuses:
        bonuses()
    elif args.values:
        unit_values(args.civ)
    elif args.best:
        units_ranked(args.best)
    elif args.update:
        update_arabia(args.civ)
    else:
        run(args.civ)
