#!/usr/bin/env python

def run():
    archers = 0
    scouts = 0
    skirms = 0
    vills = 0
    print("  Vills Archers  Scouts  Skirms")
    for i in xrange(1, 800):
        if not i % 35:
            archers += 1
        if not i % 30:
            scouts += 1
        if not i % 22:
            skirms += 1
        if not i % 25:
            vills += 1
            print("{:7} {:7} {:7} {:7}".format(vills, archers, scouts, skirms))

if __name__ == '__main__':
    run()
