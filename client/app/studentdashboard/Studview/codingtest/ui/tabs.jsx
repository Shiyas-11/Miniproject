import React, { useState } from 'react';

export function Tabs({ children, defaultValue }) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabClick = (value) => {
        setActiveTab(value);
    };

    return <div>{React.Children.map(children, (child) => React.cloneElement(child, { activeTab, onTabClick: handleTabClick }))}</div>;
}

export function TabsList({ children }) {
    return <div className="flex gap-4">{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, onTabClick }) {
    const isActive = activeTab === value;
    return (
        <button
            onClick={() => onTabClick(value)}
            className={`px-4 py-2 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, activeTab }) {
    if (activeTab !== value) return null;
    return <div className="mt-4">{children}</div>;
}
