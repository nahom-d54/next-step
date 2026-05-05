import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultActiveId, onChange }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveId(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className="tabs-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="tabs-header" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: activeId === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeId === tab.id ? '#3b82f6' : '#4b5563',
              fontWeight: activeId === tab.id ? 'bold' : 'normal',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.find((tab) => tab.id === activeId)?.content}
      </div>
    </div>
  );
}
