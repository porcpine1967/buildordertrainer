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
        "Archer": 0.11,
        "Skirmisher": 1.11,
        "Man-At-Arms": 4.11,
        "Pike": 4.11,
        "Eagle": 4.11,
        "Ram": 0.11,
        "Onager": 0.11,
        "Scorpion": 0.11,
    },
    "Berbers": {"Knight": 0.2, "Light Cav": 0.2, "Camel": 1.2},
    "Bohemians": {
        "Archer": 0.5,
        "Skirmisher": 0.5,
        "Hand Cannoneer": 1.5,
        "Pike": 0.12,
    },
    "Britons": {"Archer": 1.7, "Skirmisher": 0.7, "Trebuchet": 1},
    "Bulgarians": {"Knight": 0.33, "Light Cav": 0.33, "Man-At-Arms": 2.5,},
    "Burgundians": {"Knight": 1, "BBC": 0.25, "Hand Cannoneer": 0.25,},
    "Burmese": {
        "Knight": 0.6,
        "Light Cav": 0.6,
        "Elephant": 1.6,
        "Man-At-Arms": 3.0,
        "Pike": 3.0,
    },
    "Byzantines": {"Camel": 0.25, "Skirmisher": 0.25, "Pike": 0.25},
    "Celts": {
        "Man-At-Arms": 0.03,
        "Pike": 0.03,
        "Ram": 2.25,
        "Onager": 2.25,
        "Scorpion": 2.25,
    },
    "Chinese": {"Scorpion": 2.0,},
    "Cumans": {
        "Knight": 0.03,
        "Light Cav": 0.53,
        "Steppe Lancer": 0.53,
        "Cavalry Archer": 0.53,
        "Ram": 2.0,
    },
    "Ethiopians": {"Archer": 0.18, "Onager": 0.25, "BBC": 0.25},
    "Franks": {"Knight": 2.2, "Light Cav": 2.2},
    "Goths": {"Man-At-Arms": 1.65, "Pike": 1.65},
    "Huns": {"Knight": 0.2, "Light Cav": 0.2, "Cavalry Archer": 0.2, "Trebuchet": 2},
    "Incas": {"Skirmisher": 0.5, "Eagle": 1},
    "Indians": {"Light Cav": 1.0, "Camel": 1.4, "Hand Cannoneer": 0.5},
    "Italians": {"Hand Cannoneer": 0.2, "BBC": 0.2},
    "Japanese": {"Man-At-Arms": 0.33, "Pike": 0.33, "Trebuchet": 1},
    "Khmer": {"Elephant": 3.01, "Scorpion": 10.5},
    "Koreans": {"Archer": 0.1, "Skirmisher": 0.1, "Cavalry Archer": 0.1, "Onager": 1.5},
    "Lithuanians": {"Pike": 0.51, "Knight": 2, "Skirmisher": 0.5},
    "Magyars": {
        "Light Cav": 0.15,
        "Cavalry Archer": 1,
        "Archer": 0.2,
        "Skirmisher": 0.2,
    },
    "Malay": {"Elephant": 0.4, "Man-At-Arms": 1},
    "Malians": {
        "Knight": 5.0,
        "Light Cav": 5.0,
        "Camel": 5.0,
        "Man-At-Arms": 3.0,
        "Pike": 3.0,
    },
    "Mayans": {"Archer": 0.3, "Skirmisher": 0.8, "Eagle": 5},
    "Mongols": {
        "Light Cav": 1.9,
        "Steppe Lancer": 1.9,
        "Cavalry Archer": 0.25,
        "Onager": 0.5,
        "Scorpion": 0.5,
        "Ram": 0.5,
    },
    "Persians": {"Knight": 2, "Archer": 1},
    "Poles": {"Knight": 1, "Light Cav": 1.25},
    "Portuguese": {
        "Knight": 0.1,
        "Archer": 0.1,
        "Cavalry Archer": 0.1,
        "Hand Cannoneer": 1.1,
        "Man-At-Arms": 0.1,
        "Onager": 0.1,
        "Scorpion": 0.1,
        "Trebuchet": 0.1,
        "BBC": 1.1,
        "Ram": 0.1,
    },
    "Saracens": {"Archer": 0.2, "Camel": 1.5},
    "Sicilians": {"Knight": 3, "Light Cav": 2.0, "Archer": 2.0},
    "Slavs": {
        "Man-At-Arms": 0.25,
        "Pike": 0.25,
        "Onager": 0.15,
        "Scorpion": 0.15,
        "Ram": 0.15,
    },
    "Spanish": {"Hand Cannoneer": 0.18},
    "Tatars": {
        "Light Cav": 1.1,
        "Knight": 0.1,
        "Camel": 0.1,
        "Steppe Lancer": 1.1,
        "Cavalry Archer": 1.65,
        "Archer": 0.25,
        "Skirmisher": 0.25,
        "Hand Cannoneer": 0.25,
        "Man-At-Arms": 0.1,
        "Pike": 0.1,
        "Scorpion": 0.25,
        "Onager": 0.25,
        "Trebuchet": 1.25,
        "Ram": 0.1,
    },
    "Teutons": {
        "Knight": 2.0,
        "Man-At-Arms": 2.0,
        "Pike": 2.0,
        "Onager": 1.0,
        "Scorpion": 1.0,
        "Trebuchet": 1.0,
        "BBC": 1.0,
        "Ram": 1.0,
    },
    "Turks": {
        "Light Cav": 0.5,
        "Cavalry Archer": 1.5,
        "Hand Cannoneer": 1.25,
        "BBC": 2.25,
    },
    "Vietnamese": {
        "Elephant": 2.0,
        "Cavalry Archer": 1.5,
        "Archer": 1.5,
        "Skirmisher": 1.5,
    },
    "Vikings": {"Man-At-Arms": 4.0, "Pike": 4.0},
}


class Civilization:
    """ Holds buildings, techs, and unit codes for given civilization."""

    def __init__(self, block, dependency_manager):
        self.buildings = block["buildings"]
        self.techs = block["techs"]
        self.unique = block["unique"]
        self.units = block["units"]
        self.key_lookup = dependency_manager.constant_lookup
        self.building_from_tech = dependency_manager.building_lookups

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
                civ = Civilization(civ_data, self.dependency_manager)
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
        for _civ_name in self.civilizations:
            if civ_name and _civ_name != civ_name:
                continue
            print("*" * len(_civ_name))
            print(_civ_name)
            print("*" * len(_civ_name))
            self.calculate_unit_value(_civ_name)
            print()

    def calculate_unit_value(self, civ_name):
        """ Calculate the pre-bonus value of the given units in a civ."""
        lookup = self.dependency_manager.constant_lookup
        civ = self.civilizations[civ_name]
        values = defaultdict(float)
        range_units = [
            "Archer",
            "Skirmisher",
        ]
        stable = civ.verify_building("STABLE")
        # Stable
        if stable:
            info = civ.building_data("STABLE")
            stable_units = []
            if -1 * lookup["KNIGHT"] not in info["units"]:
                stable_units.append("Knight")
            if lookup["KNIGHT"] in info["units"]:
                values["Knight"] -= 1
            if lookup["PALADIN"] in info["units"]:
                values["Knight"] += 1
            if -1 * lookup["LIGHT_CAVALRY"] not in info["units"]:
                stable_units.append("Light Cav")
            if lookup["HUSSAR"] in info["units"]:
                values["Light Cav"] += 1
            if lookup["WINGED_HUSSAR"] in info["units"]:
                values["Light Cav"] += 2
            if lookup["CAMEL_RIDER"] in info["units"]:
                stable_units.append("Camel")
            if lookup["IMPERIAL_CAMEL_RIDER"] in info["units"]:
                stable_units.append("Camel")
                values["Camel"] += 1
            if lookup["BATTLE_ELEPHANT"] in info["units"]:
                stable_units.append("Elephant")
            if lookup["STEPPE_LANCER"] in info["units"]:
                stable_units.append("Steppe Lancer")
            for unit in stable_units:
                for tech in info["blacksmith_techs"]:
                    values[unit] += tech - 2
                if -1 * lookup["BLOODLINES"] in info["techs"]:
                    values[unit] -= 1
                if -1 * lookup["HUSBANDRY"] in info["techs"]:
                    values[unit] -= 0.1

        # Range
        info = civ.building_data("ARCHERY_RANGE")
        if stable:
            range_units.append("Cavalry Archer")
            if lookup["HEAVY_CAV_ARCHER"] in info["units"]:
                values["Cavalry Archer"] += 1
            if -1 * lookup["BLOODLINES"] in info["techs"]:
                values["Cavalry Archer"] -= 1
            if -1 * lookup["HUSBANDRY"] in info["techs"]:
                values["Cavalry Archer"] -= 0.1
            if lookup["PARTHIAN_TACTICS"] in info["techs"]:
                values["Cavalry Archer"] += 1.5

        if lookup["ARBALESTER"] in info["units"]:
            values["Archer"] += 1
        if lookup["IMPERIAL_SKIRMISHER"] in info["units"]:
            values["Skirmisher"] += 1
        for unit in range_units:
            for tech in info["blacksmith_techs"]:
                values[unit] += tech - 2
            if -1 * lookup["THUMB_RING"] in info["techs"]:
                values[unit] -= 1
        # HC
        if lookup["HAND_CANNONEER"] in info["units"]:
            values["Hand Cannoneer"] += info["blacksmith_techs"][1] - 2

        # Barracks
        info = civ.building_data("BARRACKS")
        barracks_units = ["Man-At-Arms", "Pike"]
        if lookup["EAGLE_WARRIOR"] in info["units"]:
            barracks_units.append("Eagle")
        if lookup["CHAMPION"] in info["units"]:
            values["Man-At-Arms"] += 1
        if -1 * lookup["SUPPLIES"] in info["techs"]:
            values["Man-At-Arms"] -= 0.15
        if lookup["HALBERDIER"] in info["units"]:
            values["Pike"] += 1
        for unit in barracks_units:
            for tech in info["blacksmith_techs"]:
                values[unit] += tech - 2
            if -1 * lookup["SQUIRES"] in info["techs"]:
                values[unit] -= 0.1

        # Siege
        info = civ.building_data("SIEGE_WORKSHOP")
        siege_units = [
            "Onager",
            "Scorpion",
            "Trebuchet",
        ]
        if lookup["BOMBARD_CANNON"] in info["units"]:
            siege_units.append("BBC")
        if lookup["SIEGE_ONAGER"] in info["units"]:
            values["Onager"] += 1
        if lookup["HEAVY_SCORPION"] in info["units"]:
            values["Scorpion"] += 1
        for unit in siege_units:
            values[unit] += 0
            if lookup["SIEGE_ENGINEERS"] in info["techs"]:
                values[unit] += 1
        siege_units.append("Ram")
        values["Ram"] = 0
        if lookup["SIEGE_RAM"] in info["units"]:
            values["Ram"] += 1
        try:
            for unit, bonus in CIV_UNIT_BONUSES[civ_name].items():
                values[unit] += bonus

        except KeyError:
            pass
        print(values)

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
        production_lines = []
        for building, info in self.building_info(civ_name).items():
            production_lines.append("<b>{}</b>".format(building))
            if info["techs"]:
                production_lines.append(", ".join(info["techs"]))
            production_lines.extend(info["units"])
        print('        production: "{}",'.format("<br>".join(production_lines)))

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
    c_m.calculate_unit_values(cname)


def verify():
    """ Runs dependency manager unit/tech verification."""
    dep = DependencyManager()
    dep.load()
    dep.verify()


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
    else:
        run(args.civ)
