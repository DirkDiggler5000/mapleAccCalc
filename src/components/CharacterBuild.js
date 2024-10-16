function CharacterBuild() {
    return (
        <div>

            <h1>Character Build</h1>

            <div className="row">
                <div className="col">
                    <h1>
                        Char Stats
                    </h1>
                    <div>
                        <div className='input-group mb-3'>
                            <span className="input-group-text">STR</span>
                            <input className='form-control' type="number" value={str} onChange={(event) => {
                                setStr(event.target.value)
                            }} />
                        </div>

                        <div className='input-group mb-3'>
                            <span className="input-group-text">DEX</span>
                            <input className='form-control' type="number" value={dex} onChange={(event) => {
                                setDex(event.target.value)
                            }} />
                        </div>

                        <div className='input-group mb-3'>
                            <span className="input-group-text">INT</span>
                            <input className='form-control' type="number" value={int} onChange={(event) => {
                                setInt(event.target.value)
                            }} />
                        </div>

                        <div className='input-group mb-3'>
                            <span className="input-group-text">LUK</span>
                            <input className='form-control' type="number" value={luk} onChange={(event) => {
                                setLuk(event.target.value)
                            }} />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <h1>Current Stats</h1>
                        <div>
                            <strong>STR: {str}</strong>
                        </div>
                        <div>
                            <strong>DEX: {dex}</strong>
                        </div>
                        <div>
                            <strong>INT: {int}</strong>
                        </div>
                        <div>
                            <strong>LUK: {luk}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterBuild