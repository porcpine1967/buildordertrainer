#!/usr/bin/env python
""" Tests user on hotkeys."""
from datetime import timedelta
from random import sample
import time

PROMPTS = (
    # Town Center
    ("Create Villager", "fe",),
    ("Research Loom", "fk",),
    ("Research Wheelbarrow", "fl",),
    ("Research Town Watch", "f;",),
    # Barracks
    ("Create Pikeman", "aw",),
    ("Create Man-at-Arms", "ae",),
    ("Create Eagle", "ar",),
    ("Upgrade Pikeman", "ai",),
    ("Upgrade Man-at-Arms", "ao",),
    ("Upgrade Eagle", "ap",),
    ("Research Supplies", "ak",),
    ("Research Squires", "al",),
    ("Research Arson", "a;",),
    # Range
    ("Create Archer", "se",),
    ("Create Skirmisher", "sw",),
    ("Create Cavalry Archer", "sr",),
    ("Create Hand Cannoneer", "st",),
    ("Upgrade Archer", "so",),
    ("Upgrade Skirmisher", "si",),
    ("Upgrade Cavalry Archer", "sp",),
    ("Research Thumb Ring", "sk",),
    ("Research Parthian Tactics", "sl",),
    # Stables
    ("Create Light Cavalry", "dw",),
    ("Create Knight", "de",),
    ("Create Camel", "dr",),
    ("Upgrade Light Cavalry", "di",),
    ("Upgrade Knight", "do",),
    ("Upgrade Camel", "dp",),
    ("Research Bloodlines", "dk",),
    ("Research Husbandry", "dl",),
    # Siege
    ("Create Ram", "gr",),
    ("Create Onager", "ge",),
    ("Create Scorpion", "gw",),
    ("Create Bombard Cannon", "gt",),
    ("Upgrade Ram", "gp",),
    ("Upgrade Onager", "go",),
    ("Upgrade Scorpion", "gi",),
    # ("Upgrade Bombard Cannon", "g[",),
    # Castle
    ("Create Trebuchet", "hr",),
    ("Create Unique Unit", "he",),
    ("Upgrade Unique Unit", "ho",),
    ("Research Castle Age Tech", "hk",),
    ("Research Imperial Age Tech", "hl",),
    # Dock
    ("Create Fishing Ship", "jq",),
    ("Create Fire Ship", "je",),
    ("Create Galley", "jw",),
    ("Create Demo Raft", "jr",),
    ("Upgrade Fire Ship", "jo",),
    ("Upgrade Galley", "ji",),
    # University
    ("Research Ballistics", ",k",),
    ("Research Chemistry", ",l",),
    ("Research Siege Engineers", ",;",),
    # Eco buildings
    ("Build house", "wq",),
    ("Build mill", "ww",),
    ("Build mining camp", "we",),
    ("Build lumber camp", "wr",),
    ("Build farm", "wt",),
    ("Build Dock", "wy",),
    ("Build Monastery", "wf",),
    ("Build University", "wg",),
    # Military buildings
    ("Build Archery Range", "ew",),
    ("Build Barracks", "eq",),
    ("Build Stable", "ee",),
    ("Build Town Center", "wz",),
    ("Build Castle", "ez",),
    # Monastery
    ("Create Monk", "ne",),
    ("Research Redemption", "nk",),
    ("Research Block Printing", "nl",),
    # Market
    ("Sell food", "mw",),
    ("Sell wood", "me",),
    ("Sell stone", "mr",),
    ("Buy food", "mi",),
    ("Buy wood", "mo",),
    ("Buy stone", "mp",),
    # Blacksmith
    ("Research Forging", "'i",),
    ("Research Mail", "'o",),
    ("Research Barding", "'p",),
    ("Research Fletching", "'k",),
    ("Research Archer Armor", "'l",),
    # Mill
    ("Research Horse Collar", "io",),
    # Lumber camp
    ("Research Double-bit Axe", "zo",),
    # Mine
    ("Research Gold Mining", "go",),
    ("Research Stone Mining", "gi",),
)


def run():
    """ Run the quiz """
    start = time.time()
    wrong = set()
    correct_times = {}
    for effect, hotkey in sample(PROMPTS, len(PROMPTS)):
        question_start = time.time()
        answer = input(effect + ": ")
        if answer == hotkey:
            correct_times[time.time() - question_start] = (
                effect,
                hotkey,
            )
        else:
            print("WRONG:", hotkey)
            wrong.add((effect, hotkey))
    print(len(wrong), "wrong")
    slow_count = 0
    for answer_time in sorted(correct_times, reverse=True):
        slow_count += 1
        wrong.add(correct_times[answer_time])
        if slow_count >= 10:
            break
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
