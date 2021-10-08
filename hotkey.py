#!/usr/bin/env python
""" Tests user on hotkeys."""
from datetime import timedelta
from random import sample
import time

PROMPTS = (
    ("Create Villager", "aq",),
    ("Create Archer", "se",),
    ("Create Skirmisher", "sw",),
    ("Create Hand Cannoneer", "st",),
    ("Create Cavalry Archer", "sr",),
    ("Create Pikeman", "dw",),
    ("Create Man-at-Arms", "de",),
    ("Create Eagle", "dr",),
    ("Create Light Cavalry", "fw",),
    ("Create Knight", "fe",),
    ("Create Camel", "fr",),
    ("Upgrade Archer", "so",),
    ("Upgrade Skirmisher", "si",),
    ("Upgrade Cavalry Archer", "sp",),
    ("Upgrade Pikeman", "di",),
    ("Upgrade Man-at-Arms", "do",),
    ("Upgrade Eagle", "dp",),
    ("Upgrade Light Cavalry", "fi",),
    ("Upgrade Knight", "fo",),
    ("Upgrade Camel", "fp",),
    ("Research Thumb Ring", "sk",),
    ("Research Parthian Tactics", "sl",),
    ("Research Supplies", "dk",),
    ("Research Squires", "dl",),
    ("Research Arson", "d;",),
    ("Research Bloodlines", "fk",),
    ("Research Husbandry", "fl",),
    ("Create Ram", "gr",),
    ("Create Onager", "ge",),
    ("Create Scorpion", "gw",),
    ("Create Bombard Cannon", "gt",),
    ("Upgrade Ram", "gp",),
    ("Upgrade Onager", "go",),
    ("Upgrade Scorpion", "gi",),
    ("Create Fishing Ship", "jq",),
    ("Create Fire Ship", "je",),
    ("Create Galley", "jw",),
    ("Create Demo Raft", "jr",),
    ("Upgrade Fire Ship", "jo",),
    ("Upgrade Galley", "ji",),
    ("Research Ballistics", ",k",),
    ("Research Chemistry", ",l",),
    ("Create Trebuchet", "hr",),
    ("Create Unique Unit", "he",),
    ("Upgrade Unique Unit", "ho",),
    ("Research Castle Age Tech", "hk",),
    ("Research Imperial Age Tech", "hl",),
    ("Research Wheelbarrow", "al",),
    ("Research Town Watch", "a;",),
    ("Research Loom", "ak",),
    ("Build house", "qq",),
    ("Build farm", "qa",),
    ("Build mill", "qw",),
    ("Research Horse Collar", "io",),
    ("Build lumber camp", "qr",),
    ("Research Double-bit Axe", "zo",),
    ("Build mining camp", "qe",),
    ("Research Gold Mining", "go",),
    ("Research Stone Mining", "gi",),
    ("Create Monk", "ne",),
    ("Sell food", "mw",),
    ("Sell wood", "me",),
    ("Sell stone", "mr",),
    ("Buy food", "mi",),
    ("Buy wood", "mo",),
    ("Buy stone", "mp",),
    ("Build Archery Range", "ww",),
    ("Build Barracks", "wa",),
    ("Build Stable", "we",),
    ("Build Town Center", "qz",),
    ("Build Castle", "wc",),
    ("Research Forging", "si",),
    ("Research Mail", "so",),
    ("Research Barding", "sp",),
    ("Research Fletching", "sk",),
    ("Research Archer Armor", "sl",),
)


def run():
    start = time.time()
    wrong = set()
    for effect, hotkey in sample(PROMPTS, len(PROMPTS)):
        answer = input(effect + ": ")
        if answer != hotkey:
            print("WRONG:", hotkey)
            wrong.add((effect, hotkey))
    print(len(wrong), "wrong")
    cnt = 0
    for effect, hotkey in sample(list(wrong), len(wrong)):
        answer = input(effect + ": ")
        if answer != hotkey:
            print("WRONG AGAIN:", hotkey)
            cnt += 1
    print(cnt, "wrong again")
    print(timedelta(seconds=int(time.time() - start)))


if __name__ == "__main__":
    run()
