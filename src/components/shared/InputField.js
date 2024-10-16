function InputField({ label, value, onChange }) {
    return (
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text">{label}</span>
                <input type="number" className="form-control" value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default InputField