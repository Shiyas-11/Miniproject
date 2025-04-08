import React from 'react';

export function Textarea({ placeholder, value, onChange, className }) {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded p-2 text-gray-800 ${className}`}
        />
    );
}
