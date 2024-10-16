import InputField from "../shared/InputField"

function CharacterBaseStats({
    damageType,
    damageTypeOnChange,
    classType,
    classTypeOnChange,
    characterLevel,
    levelOnChange,
    characterStr,
    strOnChange,
    characterDex,
    dexOnChange,
    characterInt,
    intOnChange,
    characterLuk,
    lukOnChange,
    characterAccuracy,
    additionalAccuracy,
    additionalAccuracyOnChange
}) {
    return (
        <div className="row">
            <div className="col">
                <InputField label={'LVL'} value={characterLevel} onChange={levelOnChange} />
                <InputField label={'STR'} value={characterStr} onChange={strOnChange} />
                <InputField label={'DEX'} value={characterDex} onChange={dexOnChange} />
                <InputField label={'INT'} value={characterInt} onChange={intOnChange} />
                <InputField label={'LUK'} value={characterLuk} onChange={lukOnChange} />
                <label>Calculated Build Accuracy: <strong>{characterAccuracy.toPrecision(3)}</strong></label>
            </div>

            <div className="col" style={{ textAlign: '-webkit-center' }}>
                <div className="row">
                    <strong>Damage Type</strong>

                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'p'}
                            checked={damageType === 'p'}
                            onChange={damageTypeOnChange} />
                        <label htmlFor="physicalDamageType" className="form-check-label">
                            Physical
                        </label>
                    </div>

                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'m'}
                            checked={damageType === 'm'}
                            onChange={damageTypeOnChange} />
                        <label htmlFor="magicDamageType" className="form-check-label">
                            Magical
                        </label>
                    </div>
                </div>

                <div className="row">
                    <strong>Class</strong>
                    
                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'s'}
                            checked={classType === 's'}
                            onChange={classTypeOnChange} />
                        <label htmlFor="sClassType" className="form-check-label">
                            Swordman
                        </label>
                    </div>

                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'a'}
                            checked={classType === 'a'}
                            onChange={classTypeOnChange} />
                        <label htmlFor="aClassType" className="form-check-label">
                            Archer
                        </label>
                    </div>

                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'m'}
                            checked={classType === 'm'}
                            onChange={classTypeOnChange} />
                        <label htmlFor="mClassType" className="form-check-label">
                            Magician
                        </label>
                    </div>

                    <div className="form-check" style={{ width: '50%' }}>
                        <input type="radio" className="form-check-input"
                            value={'r'}
                            checked={classType === 'r'}
                            onChange={classTypeOnChange} />
                        <label htmlFor="rClassType" className="form-check-label">
                            Rogue
                        </label>
                    </div>
                </div>

                <div className="row pt-4">
                    <InputField label={'Additional Acc'} value={additionalAccuracy} onChange={additionalAccuracyOnChange} />
                </div>
            </div>
        </div>
    )
}

export default CharacterBaseStats