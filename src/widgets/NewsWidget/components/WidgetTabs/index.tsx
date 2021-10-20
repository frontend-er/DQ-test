import React, { FC, memo } from 'react'

import { Tabs, widgetTabs } from "../../types";
import tabsStyle from './tabs.module.css'

interface WidgetTabsProps {
    activeTab: Tabs
    onTabClick: (tab: Tabs) => void
}
const WidgetTabs: FC<WidgetTabsProps> = ({ activeTab, onTabClick }) => {
    const handleTabClick = (tab: Tabs) => () => {
        onTabClick(tab)
    }

    return (
        <div className={tabsStyle.list}>
            {
                widgetTabs.map(tab => (
                    <span
                        key={tab.value}
                        className={`${tabsStyle.item} ${tab.value === activeTab && tabsStyle.active}`}
                        onClick={handleTabClick(tab.value)}
                    >
                        {tab.name}
                    </span>
                ))
            }
        </div>
    )
}

export default memo(WidgetTabs)