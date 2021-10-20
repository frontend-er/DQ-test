export type Tabs = "news" | "bookmarks"
export interface WidgetTab {
    name: string
    value: Tabs
}
export const widgetTabs: WidgetTab[] = [
    { name: 'News', value: "news" },
    { name: 'Bookmarks', value: "bookmarks" }
]