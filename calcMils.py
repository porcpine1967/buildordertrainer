#!/usr/bin/env python

def run():
    archers = 0
    archers2 = 0
    scouts = 0
    skirms = 0
    militia = 0
    vills = 0
    galleys = 0
    fish = 0
    print("  Vills Archers  Scouts Sc-Arch S-Skirms Militia Maa-Arc Galleys Fish")
    for i in xrange(1, 800):
        if not i % 40:
            fish += 1
        if not i % 60:
            galleys += 1
        if not i % 35:
            archers += 1
        if (i - 50 > 0) and not (i - 50) % 35:
            archers2 += 1
        if not i % 30:
            scouts += 1
        if not i % 22:
            skirms += 1
        if not i % 21:
            militia += 1
        if not i % 25:
            vills += 1
            print("{:5} {:6} {:7} {:7} {:7} {:8} {:7} {:7} {:7}".format(vills, 1 + archers*2, scouts, 6 + archers + archers2, 6 + skirms, militia + 1, 4 + archers*2, 3 + galleys*3, fish))

if __name__ == '__main__':
    run()
