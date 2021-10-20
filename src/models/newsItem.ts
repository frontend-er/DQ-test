enum Related {
    AAPL = "AAPL"
}

export interface NewsItem {
    category: string
    datetime: number
    headline: string
    id: number
    image: string
    related: Related
    source: string,
    summary: string,
    url: string
}