import { useState } from 'react';
import monsters from '../../data/monsters.json'

function MonsterDetails({
    damageType,
    characterLevel,
    characterStats
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    const monstersByLevel = filteredMonsters.sort(function (a, b) {
        return a.level - b.level
    });

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;

        setSearchTerm(newSearchTerm);

        let filtered = []

        if (newSearchTerm === null || newSearchTerm.trim() === '') {
            filtered = monsters;
        }
        else {
            filtered = monsters.filter((monster) => {
                return monster.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
        }

        setFilteredMonsters(filtered);
    }

    function GetLevelDiff(monsterLevel) {
        const monsterLevelInt = parseInt(monsterLevel);
        const characterLevelInt = parseInt(characterLevel);

        let levelDiff = monsterLevelInt - characterLevelInt;

        if (levelDiff < 0) {
            levelDiff = 0;
        }

        return levelDiff
    };

    function GetOneHundredPercentHit(monsterAvoid, monsterLevel) {
        const monsterAvoidInt = parseInt(monsterAvoid);
        const levelDiff = GetLevelDiff(monsterLevel);

        // 100% accuracy calculation here
        if (damageType === 'p') {
            return (55.2 + 2.15 * levelDiff) * (monsterAvoidInt / 15);
        }

        return Math.floor((monsterAvoidInt + 1.0) * (1.0 + (0.04 * levelDiff)));
    };

    function GetMonsterOnePercentHit(monsterAvoid, monsterLevel) {
        const oneHundredPercentAcc = GetOneHundredPercentHit(monsterAvoid, monsterLevel)

        // 1% accuracy calculation here
        if (damageType === 'p') {
            return oneHundredPercentAcc * 0.5 + 1;
        }

        return Math.round(0.41 * oneHundredPercentAcc);
    };

    function GetHitRate(monsterAvoid, monsterLevel) {
        let hitRate = 0;

        const oneHundredPercentAcc = GetOneHundredPercentHit(monsterAvoid, monsterLevel);
        const onePercentAcc = GetMonsterOnePercentHit(monsterAvoid, monsterLevel);

        if (damageType === 'p') {
            const charStatAccInt = parseInt(characterStats.acc);

            hitRate = 100 * ((charStatAccInt - (oneHundredPercentAcc * 0.5)) / (oneHundredPercentAcc * 0.5));
        }
        else {
            const charStatIntInt = parseInt(characterStats.int);
            const charStatLukInt = parseInt(characterStats.luk);

            let currentAccuracy = (Math.floor(charStatIntInt / 10) + Math.floor(charStatLukInt / 10));

            let accuracyPartial = (currentAccuracy - onePercentAcc + 1) / (oneHundredPercentAcc - onePercentAcc + 1);

            hitRate = ((-0.7011618132 * Math.pow(accuracyPartial, 2)) + (1.702139835 * accuracyPartial)) * 100;
        }

        if (hitRate > 100) {
            hitRate = 100;
        }
        else if (hitRate < 0) {
            hitRate = 0;
        }

        return hitRate;
    };

    function GetBackgroundColor(monsterAvoid, monsterLevel) {
        const hitRate = GetHitRate(monsterAvoid, monsterLevel);

        if (hitRate == 100) {
            return 'rgba(35, 255, 0, 0.75)';
        }
        else if (hitRate < 100 && hitRate >= 60) {
            return 'rgba(250, 255, 88, 0.75)';
        }
        else if (hitRate < 60 && hitRate >= 30) {
            return 'rgba(255, 146, 0, 0.75)';
        }
        else if (hitRate < 30 && hitRate >= 1) {
            return 'rgba(255, 0, 0, 0.75)';
        }
        else {
            return 'rgba(206, 206, 206, 0.75)';
        }
    }

    return (
        <div>
            <div className='p-1' style={{
                textAlign: '-webkit-center'
            }}>
                <strong>Monster Search: </strong>
                <input className='form-control' style={{ width: '25%', textAlign: 'center' }} type='text' value={searchTerm} onChange={handleSearchChange} />
            </div>

            <div className="row">
                {monstersByLevel.map(monster => {
                    let renderType = 'move'

                    if (monster.id === '2300100' || monster.id === '5300100') {
                        renderType = 'fly'
                    }

                    return (<div key={monster.id} className="col-2"
                        style={{
                        }}>
                        <div className="col-12" style={{
                            marginTop: '24px',
                            backgroundColor: `${GetBackgroundColor(monster.avoid, monster.level)}`,
                            borderRadius: '10px',
                            boxShadow: 'rgba(136, 165, 191, 1) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px'
                        }}>
                            <div>
                                <img src={`https://maplestory.io/api/gms/62/mob/${monster.id}/render/${renderType}`} width={50} height={50} />
                            </div>
                            <div>
                                <strong>{monster.name}</strong>
                            </div>
                            <div>
                                <span>Level: {monster.level}</span>
                            </div>
                            <div>
                                <span>Avoid: {monster.avoid}</span>
                            </div>
                            <div>
                                <span>Acc for 1% Hit: <strong>{GetMonsterOnePercentHit(monster.avoid, monster.level).toPrecision(3)}</strong></span>
                            </div>
                            <div>
                                <span>Acc for 100% Hit: <strong>{GetOneHundredPercentHit(monster.avoid, monster.level).toPrecision(3)}</strong></span>
                            </div>
                            <div>
                                <span>Hit Rate: <strong>{GetHitRate(monster.avoid, monster.level).toPrecision(3)}</strong></span>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default MonsterDetails