const TextInput = (props) => {
    const inputProps = {
        value: '',
        label: '',
        placeholder: '',
        type: 'text',
        className: '',
        onInputChange: () => {},
        ...props,
    };
    return (
        <div className="form-control">
            <label>{inputProps.label}</label>
            <input
                defaultValue={inputProps.value}
                className={inputProps.className}
                type={inputProps.type}
                placeholder={inputProps.placeholder}
                onChange={(e) => inputProps.onInputChange(e)}
            />
        </div>
    );
};

export default TextInput;
