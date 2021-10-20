import { Button } from '@mui/material'
import React, { FC, memo } from 'react'

import paginationStyle from './pagination.module.css'

interface PaginationProps {
    onNext: VoidFunction
    onPrev: VoidFunction
    totalCount: number
    pageSize: number,
    currentPage: number
    hasNext?: boolean
    hasPrev?: boolean
}

const Pagination: FC<PaginationProps> = ({
    onPrev,
    onNext,
    totalCount,
    pageSize,
    currentPage,
    hasNext,
    hasPrev
}) => {
    const min = currentPage * pageSize + 1
    const max = min + pageSize - 1

    return (
        <div className={paginationStyle.container}>
            <span>
                <span className={paginationStyle.textBright}>{min}-{max}</span>
                <span className={paginationStyle.textPale}>out of {totalCount}</span>
            </span>
            <div className={paginationStyle.btnGroup}>
                <Button variant="contained" color="inherit" disabled={!hasPrev} className={paginationStyle.btn} onClick={onPrev}>Previous</Button>
                <Button variant="contained" color="inherit" disabled={!hasNext} className={paginationStyle.btn} onClick={onNext}>Next</Button>
            </div>
        </div>
    )
}

export default memo(Pagination)