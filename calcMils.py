#!/usr/bin/env python

def run():
    archers = 0
    archers2 = 0
    scouts = 0
    skirms = 0
    militia = 0
    vills = 0
    print("  Vills Archers  Scouts Sc-Arch S-Skirms Militia Maa-Arc")
    for i in xrange(1, 800):
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
            print("{:5} {:6} {:7} {:7} {:7} {:8} {:7}".format(vills, 1 + archers*2, scouts, 6 + archers + archers2, 6 + skirms, militia + 1, 4 + archers*2))

if __name__ == '__main__':
    run()
