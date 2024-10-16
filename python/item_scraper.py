import json
import re
from bs4 import BeautifulSoup

itemTypes = [
    'hats',
    'overalls',
    'tops',
    'bottoms',
    'shoes',
    'gloves',
    'capes',
    'shields'
]

weaponTypes = [
    'oneHandedSwords',
    'twoHandedSwords',
    'oneHandedAxes',
    'twoHandedAxes',
    'oneHandedMaces',
    'twoHandedMaces',
    'bows',
    'crossbows',
    'claws',
    'daggers',
    'spears',
    'polearms',
    'wands',
    'staffs',
]

def createItemJsonFile(itemType, isWeapon):
    # Path to your local HTML file
    if not isWeapon:
        file_path = f'htmlToScrape\\armour\{itemType}.html'
    else:
        file_path = f'htmlToScrape\weapons\{itemType}.html'

    # Open the local HTML file and read its content
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    itemList = []

    itemsDiv = soup.find('div', class_='view view-armours view-id-armours view-display-id-page_1 view-dom-id-1')

    if not itemsDiv:
        itemsDiv= soup.find('div', class_='view view-weapons view-id-weapons view-display-id-page_1 view-dom-id-1')

    if itemsDiv:
        print(f'Starting {itemType}...')

        itemTables = itemsDiv.find_all('table')

        for itemTable in itemTables:
            tableRows = itemTable.find_all('tr')

            # tableRows[0] contains image, name, required level, and required stats
            tdRows = tableRows[0].find_all('td')

            imageUrl = tdRows[0].find('img')['src']   
            itemName = tdRows[1].find('strong').text.strip()
            requiredLevel = int(''.join(filter(str.isdigit, tdRows[2].text)))

            requiredStatsStrings = tdRows[3].text.split(':')[1].split(',')

            requiredStats = {
                                'str': 0,
                                'dex': 0,
                                'int': 0,
                                'luk': 0
                            }
            for statString in requiredStatsStrings:
                if 'str' in statString.lower():
                    requiredStats['str'] = int(''.join(filter(str.isdigit, statString)))
                if 'dex' in statString.lower():
                    requiredStats['dex'] = int(''.join(filter(str.isdigit, statString)))
                if 'int' in statString.lower():
                    requiredStats['int'] = int(''.join(filter(str.isdigit, statString)))
                if 'luk' in statString.lower():
                    requiredStats['luk'] = int(''.join(filter(str.isdigit, statString)))

            # tableRows[1] contains weapon def, magic def, and job for items : contains weapon/magic att, att speed, and job for weapons
            tdRows = tableRows[1].find_all('td')

            if not isWeapon:
                weaponDefense = re.sub(r'\D', '', tdRows[0].text.split(':')[1].split('(')[0])

                if weaponDefense:
                    weaponDefense = int(weaponDefense)

                weaponDefenseRange = ''

                if '(' in tdRows[0].text.split(':')[1]:
                    weaponDefenseRange = tdRows[0].text.split(':')[1].split('(')[1].split(')')[0]

                magicDefense = re.sub(r'\D', '', tdRows[1].text.split(':')[1].split('(')[0])

                if magicDefense:
                    magicDefense = int(magicDefense)

                magicDefenseRange = ''

                if '(' in tdRows[1].text.split(':')[1]:
                    magicDefenseRange = tdRows[1].text.split(':')[1].split('(')[1].split(')')[0]
            else:
                attackDivs = tdRows[0].find_all('div')

                weaponAttack = 0
                weaponAttackRange = ''
                magicAttack = 0
                magicAttackRange = ''

                for attackDiv in attackDivs:
                    if 'Weapon' in attackDiv.text:
                        weaponAttack = re.sub(r'\D', '', attackDiv.text.split(':')[1].split('(')[0])

                        if weaponAttack:
                                weaponAttack = int(weaponAttack)

                        weaponAttackRange = ''

                        if '(' in attackDiv.text.split(':')[1]:
                            weaponAttackRange = attackDiv.text.split(':')[1].split('(')[1].split(')')[0]
                    else:
                        magicAttack = re.sub(r'\D', '', attackDiv.text.split(':')[1].split('(')[0])

                        if magicAttack:
                                magicAttack = int(magicAttack)

                        magicAttackRange = ''

                        if '(' in attackDiv.text.split(':')[1]:
                            magicAttackRange = attackDiv.text.split(':')[1].split('(')[1].split(')')[0]

                weaponSpeedTDElement = tdRows[1]

                # There's weird weapons that have durability, those items don't matter for OSMS so I just skip them
                if 'Durability' in weaponSpeedTDElement.text:
                    continue
                
                weaponSpeed = re.sub(r'\D', '', weaponSpeedTDElement.text.split(':')[1])

            job = tdRows[2].text.split(':')[1].strip()

            # tableRows[2] contains effects, number of upgrades, and "sells for"
            tdRows = tableRows[2].find_all('td')

            effectsStrings = tdRows[0].text.split(':')[1].split(',')

            effectsStats = {
                                'str': 0,
                                'strRange': '',
                                'dex': 0,
                                'dexRange': '',
                                'int': 0,
                                'intRange': '',
                                'luk': 0,
                                'lukRange': '',
                                'weaponAttack': 0,
                                'weaponAttackRange': '',
                                'magicAttack': 0,
                                'magicAttackRange': '',
                                'knockBackRate': 0,
                                'knockBackRateRange': '',
                                'accuracy': 0,
                                'accuracyRange': '',
                                'avoidability': 0,
                                'avoidabilityRange': '',
                                'speed': 0,
                                'speedRange': '',
                                'hp': 0,
                                'hpRange': '',
                                'mp': 0,
                                'mpRange': '',
                                'weaponDefense': 0,
                                'weaponDefenseRange': ''
                            }
            
            def setItemEffectStat(effectName, effectString, effectsStats):
                effectsStats[effectName] = int(re.sub(r'\D', '', effectString.split('(')[0]))

                if '(' in effectString:
                    effectsStats[effectName + 'Range'] = effectString.split('(')[1].split(')')[0]
            
            for effectString in effectsStrings:
                if 'str' in effectString.lower():
                    setItemEffectStat('str', effectString, effectsStats)
                if 'dex' in effectString.lower():
                    setItemEffectStat('dex', effectString, effectsStats)
                if 'int' in effectString.lower():
                    setItemEffectStat('int', effectString, effectsStats)
                if 'luk' in effectString.lower():
                    setItemEffectStat('luk', effectString, effectsStats)
                if 'weaponAttack' in effectString.lower():
                    setItemEffectStat('weaponAttack', effectString, effectsStats)
                if 'magicAttack' in effectString.lower():
                    setItemEffectStat('magicAttack', effectString, effectsStats)
                if 'knock' in effectString.lower():
                    setItemEffectStat('knockBackRate', effectString, effectsStats)
                if 'accuracy' in effectString.lower():
                    setItemEffectStat('accuracy', effectString, effectsStats)
                if 'avoidability' in effectString.lower():
                    setItemEffectStat('avoidability', effectString, effectsStats)
                if 'speed' in effectString.lower():
                    setItemEffectStat('speed', effectString, effectsStats)
                if 'hp' in effectString.lower():
                    setItemEffectStat('hp', effectString, effectsStats)
                if 'mp' in effectString.lower():
                    setItemEffectStat('mp', effectString, effectsStats)
                if 'weapon def' in effectString.lower():
                    setItemEffectStat('weaponDefense', effectString, effectsStats)

            upgradeSlots = re.sub(r'\D', '', tdRows[1].text.split(':')[1])

            if upgradeSlots:
                upgradeSlots = int(upgradeSlots)
            else:
                upgradeSlots = 0

            sellsFor = re.sub(r'\D', '', tdRows[2].text.split(':')[1])

            if sellsFor:
                sellsFor = int(sellsFor)
            else:
                sellsFor = 0

            # tableRows[3] contains "dropped by"
            tdRows = tableRows[3].find_all('td')

            droppedBy = []
            droppedByList = tdRows[0].text.split(':')[1].split(',')

            for x in droppedByList:
                ogString = x.strip().replace('\n', '').replace('\r', '').split()
                cleanedDroppedByString = " ".join(ogString)
                if cleanedDroppedByString != '-':
                    droppedBy.append(cleanedDroppedByString)

            # tableRows[4] contains "available from"
            tdRows = tableRows[4].find_all('td')
            liItems = tdRows[0].find_all('li')

            availableFromList = []
            for liItem in liItems:
                availableFromOGString = liItem.text.replace('\n', '').replace('\r', '').split()
                availableFrom = " ".join(availableFromOGString)
                availableFromList.append(availableFrom)

            
            if not isWeapon:
                item_object = {
                    'imageUrl': imageUrl,
                    'itemName': itemName,
                    'requiredLevel': requiredLevel,
                    'requiredStats': {
                        'str': requiredStats['str'],
                        'dex': requiredStats['dex'],
                        'int': requiredStats['int'],
                        'luk': requiredStats['luk']
                    },
                    'weaponDefense': weaponDefense,
                    'weaponDefenseRange': weaponDefenseRange,
                    'magicDefense': magicDefense,
                    'magicDefenseRange': magicDefenseRange,
                    'job': job,
                    'effects': {
                        'str': effectsStats['str'],
                        'strRange': effectsStats['strRange'],
                        'dex': effectsStats['dex'],
                        'dexRange': effectsStats['dexRange'],
                        'int': effectsStats['int'],
                        'intRange': effectsStats['intRange'],
                        'luk': effectsStats['luk'],
                        'lukRange': effectsStats['lukRange'],
                        'weaponAttack': effectsStats['weaponAttack'],
                        'weaponAttackRange': effectsStats['weaponAttackRange'],
                        'magicAttack': effectsStats['magicAttack'],
                        'magicAttackRange': effectsStats['magicAttackRange'],
                        'knockBackRate': effectsStats['knockBackRate'],
                        'knockBackRateRange': effectsStats['knockBackRateRange'],
                        'accuracy': effectsStats['accuracy'],
                        'accuracyRange': effectsStats['accuracyRange'],
                        'avoidability': effectsStats['avoidability'],
                        'avoidabilityRange': effectsStats['avoidabilityRange'],
                        'speed': effectsStats['speed'],
                        'speedRange': effectsStats['speedRange'],
                        'hp': effectsStats['hp'],
                        'hpRange': effectsStats['hpRange'],
                        'mp': effectsStats['mp'],
                        'mpRange': effectsStats['mpRange'],
                        'weaponDefense': effectsStats['weaponDefense'],
                        'weaponDefenseRange': effectsStats['weaponDefenseRange']
                    },
                    'upgradeSlots': upgradeSlots,
                    'sellsFor': sellsFor,
                    'droppedBy': droppedBy,
                    'obtainedFrom': availableFromList
                }

                itemList.append(item_object)
            else:
                weapon_object = {
                    'imageUrl': imageUrl,
                    'itemName': itemName,
                    'requiredLevel': requiredLevel,
                    'requiredStats': {
                        'str': requiredStats['str'],
                        'dex': requiredStats['dex'],
                        'int': requiredStats['int'],
                        'luk': requiredStats['luk']
                    },
                    'weaponAttack': weaponAttack,
                    'weaponAttackRange': weaponAttackRange,
                    'magicAttack': magicAttack,
                    'magicAttackRange': magicAttackRange,
                    'weaponSpeed': weaponSpeed,
                    'job': job,
                    'effects': {
                        'str': effectsStats['str'],
                        'strRange': effectsStats['strRange'],
                        'dex': effectsStats['dex'],
                        'dexRange': effectsStats['dexRange'],
                        'int': effectsStats['int'],
                        'intRange': effectsStats['intRange'],
                        'luk': effectsStats['luk'],
                        'lukRange': effectsStats['lukRange'],
                        'weaponAttack': effectsStats['weaponAttack'],
                        'weaponAttackRange': effectsStats['weaponAttackRange'],
                        'magicAttack': effectsStats['magicAttack'],
                        'magicAttackRange': effectsStats['magicAttackRange'],
                        'knockBackRate': effectsStats['knockBackRate'],
                        'knockBackRateRange': effectsStats['knockBackRateRange'],
                        'accuracy': effectsStats['accuracy'],
                        'accuracyRange': effectsStats['accuracyRange'],
                        'avoidability': effectsStats['avoidability'],
                        'avoidabilityRange': effectsStats['avoidabilityRange'],
                        'speed': effectsStats['speed'],
                        'speedRange': effectsStats['speedRange'],
                        'hp': effectsStats['hp'],
                        'hpRange': effectsStats['hpRange'],
                        'mp': effectsStats['mp'],
                        'mpRange': effectsStats['mpRange'],
                        'weaponDefense': effectsStats['weaponDefense'],
                        'weaponDefenseRange': effectsStats['weaponDefenseRange']
                    },
                    'upgradeSlots': upgradeSlots,
                    'sellsFor': sellsFor,
                    'droppedBy': droppedBy,
                    'obtainedFrom': availableFromList
                }

                itemList.append(weapon_object)

    if not isWeapon:
        outputFile = f'data/armour/{itemType}ItemList.json'
    else:
        outputFile = f'data/weapons/{itemType}ItemList.json'

    with open(outputFile, 'w', encoding='utf-8') as json_file:
        json.dump(itemList, json_file, ensure_ascii = False, indent = 4)

    print(f'Completed {outputFile}...')

for itemType in itemTypes:
    isWeapon = False
    createItemJsonFile(itemType, isWeapon)

for weaponType in weaponTypes:
    isWeapon = True
    createItemJsonFile(weaponType, isWeapon)