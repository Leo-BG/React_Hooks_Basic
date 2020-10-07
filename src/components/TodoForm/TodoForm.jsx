import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
    onSubmit: null
}

function TodoForm({ onSubmit }) {
    const [value, setValue] = useState('');
    function handleValueChange(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!onSubmit) return;
        const formValue = {
            title: value,

        }
        onSubmit(formValue);
        setValue('');
    }

    return (
        <form className="todoForm" onSubmit={handleSubmit}>
            <input type="text"
                value={value}

                onChange={handleValueChange} />
        </form>
    );
}

export default TodoForm;