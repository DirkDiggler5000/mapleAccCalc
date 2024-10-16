import json
import re
from bs4 import BeautifulSoup

classes = [
    'magician',
    'swordman',
    'assassin',
    'bandit',
    'bowman',
    'chiefbandit',
    'cleric',
    'crossbowman',
    'crusader',
    'dragonknight',
    'fighter',
    'firepoison',
    'firepoison2',
    'hermit',
    'hunter',
    'icelightning',
    'icelightning2',
    'knight',
    'page',
    'priest',
    'ranger',
    'rogue',
    'sniper',
    'spearman'
]

classSkills = []
classId = 1

def createSkillJsonFile(className, classId):
    # Path to your local HTML file
    file_path = f'C:\\Users\\jspin\\Desktop\\ms-site\\htmlToScrape\\skills\\{className}.html'

    # Open the local HTML file and read its content
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    skillList = []

    skillTables = soup.find_all('table', attrs={'width': '524'})

    if skillTables:
        print(f'Starting skills for {className}...')

        for skillTable in skillTables:
            skill = {
                'id': 0,
                'name': '',
                'img': '',
                'maxLevel': 0,
                'type': '',
                'description': '',
                'levelDescriptions': []
            }

            tableRows = skillTable.find_all('tr')

            currentTrCount = 0;
            for tableRow in tableRows:
                if (currentTrCount == 0):
                    tdRows = tableRow.find_all('td')
                    
                    skill['name'] = tdRows[1].text
                    skill['img'] = 'http://wayback.hidden-street.net/characters/' + tdRows[0].find('img')['src']
                    skill['maxLevel'] = int(re.sub(r'\D', '', tdRows[2].text.split(':')[1]))

                    currentTrCount += 1;
                    continue;

                if (currentTrCount == 1):
                    tdRows = tableRow.find_all('td')

                    skill['type'] = tdRows[0].text.split(':')[1]

                    currentTrCount += 1;
                    continue;

                if (currentTrCount == 2):
                    tdRows = tableRow.find_all('td')

                    ogString = tdRows[0].text.split(':')[1].strip().replace('\n', '').replace('\r', '').split()
                    cleanedString = " ".join(ogString)
                    skill['description'] = cleanedString

                    currentTrCount += 1;
                    continue;
    
                if (currentTrCount >= 3):
                    tdRows = tableRow.find_all('td')

                    skillLevel = int(re.sub(r'\D', '', tdRows[0].text.split(':')[0]))

                    if (className == 'magician' and currentTrCount == 3):
                        skillDescription = ''
                    else:
                        skillDescriptionOg = tdRows[0].text.split(':')[1].strip().replace('\n', '').replace('\r', '').split()
                        skillDescription = " ".join(skillDescriptionOg)

                    skillBonusAccuracy = 0

                    levelDescription = {
                        'level': skillLevel,
                        'description': skillDescription,
                        'bonusAccuracy': skillBonusAccuracy
                    }

                    skill['levelDescriptions'].append(levelDescription)

                    currentTrCount += 1;
                    continue;
            
            skillList.append(skill)
            
    skill_object = {
        'className': className,
        'classId': classId,
        'skills': skillList
    }

    classSkills.append(skill_object)

    print(f'Completed {className}...')

for className in classes:
    createSkillJsonFile(className, classId)

    outputFile = f'C:\\Users\\jspin\\Desktop\\ms-site\\os-maple-gg\\src\\data\\skills\\class_skills.json'

    with open(outputFile, 'w', encoding='utf-8') as json_file:
        json.dump(classSkills, json_file, ensure_ascii = False, indent = 4)

    classId += 1
