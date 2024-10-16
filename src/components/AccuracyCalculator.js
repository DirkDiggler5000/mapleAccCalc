import { useMemo, useState } from 'react';
import CharacterBaseStats from './AccuracyCalculatorComponents/CharacterBaseStats';
import MonsterDetails from './AccuracyCalculatorComponents/MonsterDetails';
import SkillBuild from './AccuracyCalculatorComponents/SkillBuild';

function AccuracyCalculator() {
    const [characterLevel, setcharacterLevel] = useState(1);
    const [characterStr, setcharacterStr] = useState(4);
    const [characterDex, setcharacterDex] = useState(4);
    const [characterInt, setcharacterInt] = useState(4);
    const [characterLuk, setcharacterLuk] = useState(4);
    const [additionalAccuracy, setAdditionalAccuracy] = useState(0);
    const [classType, setClassType] = useState('s');
    const [damageType, setdamageType] = useState('p');

    const calculatedAccuracy = useMemo(() => {
        let additionalAcc = 0;

        if (isNaN(parseInt(additionalAccuracy))) {
            additionalAcc = 0;
        }
        else {
            additionalAcc = additionalAccuracy;
        }

        const accuracyFromSkills = 0;

        if (classType === 's' || classType === 'm') {
            const accFromDex = parseInt(characterDex) * 0.8;
            const accFromLuk = parseInt(characterLuk) * 0.5;

            const calculatedAccuracy = accFromDex + accFromLuk + accuracyFromSkills + parseInt(additionalAcc);

            return calculatedAccuracy;
        }

        if (classType === 'a' || classType === 'r') {
            const accFromDex = parseInt(characterDex) * 0.6;
            const accFromLuk = parseInt(characterLuk) * 0.3;

            const calculatedAccuracy = accFromDex + accFromLuk + accuracyFromSkills + parseInt(additionalAcc);

            return calculatedAccuracy;
        }
    }, [classType, characterDex, characterLuk, additionalAccuracy]);

    const characterStats = {
        str: characterStr,
        dex: characterDex,
        int: characterInt,
        luk: characterLuk,
        acc: calculatedAccuracy
    }

    return (
        <div className="container text-center">

            {/* Mob search / Char stats row */}
            <div className="row">
                <div className="col">
                    <h4>Character Stats</h4>

                    <CharacterBaseStats
                        damageType={damageType}
                        damageTypeOnChange={(event) => { setdamageType(event.target.value) }}
                        classType={classType}
                        classTypeOnChange={(event) => { setClassType(event.target.value) }}
                        characterLevel={characterLevel}
                        levelOnChange={(event) => { setcharacterLevel(event.target.value) }}
                        characterStr={characterStr}
                        strOnChange={(event) => { setcharacterStr(event.target.value) }}
                        characterDex={characterDex}
                        dexOnChange={(event) => { setcharacterDex(event.target.value) }}
                        characterInt={characterInt}
                        intOnChange={(event) => { setcharacterInt(event.target.value) }}
                        characterLuk={characterLuk}
                        lukOnChange={(event) => { setcharacterLuk(event.target.value) }}
                        characterAccuracy={calculatedAccuracy}
                        additionalAccuracy={additionalAccuracy}
                        additionalAccuracyOnChange={(event) => { setAdditionalAccuracy(event.target.value) }} />
                </div>

                <div className="col" style={{textAlign: '-webkit-center'}}>
                    <div>
                        <p>Swordman/Magician:</p>
                        <ul style={{width: '35%'}}>
                            <li>1 DEX = 0.8 Accuracy</li>
                            <li>1 LUK = 0.5 Accuracy</li>
                        </ul>
                    </div>

                    <div>
                        <p>Rogue/Archer:</p>
                        <ul style={{width: '35%'}}>
                            <li>1 DEX = 0.6 Accuracy</li>
                            <li>1 LUK = 0.3 Accuracy</li>
                        </ul>
                    </div>

                    <div>
                        <a href="https://forum.maplelegends.com/index.php?threads/manas-physical-accuracy-guide.55286/">DEX/LUK Accuracy Calculations Source</a>
                    </div>

                    <div>
                        <a href="https://mrsoupman.github.io/Maple-ACC-calculator/">Monster Accuracy Calculations Source</a>
                    </div>
                    {/* <h4>Skill Build</h4>

                    <SkillBuild /> */}
                </div>
            </div>

            {/* Monster info / Accuracy Calculation */}
            <div className="row">

                {/* Monster info */}
                <div className="col">
                    <MonsterDetails damageType={damageType} characterLevel={characterLevel} characterStats={characterStats} />
                </div>
            </div>
        </div>
    )
}

export default AccuracyCalculator