const SubmitInput = (props) => {
    const inputProps = {
        value: '',
        className: '',
        onInputChange: () => {},
        ...props,
    };
    return (
        <div className="form-control">
            <input value={inputProps.value} className={inputProps.className} type="submit" />
        </div>
    );
};

export default SubmitInput;
