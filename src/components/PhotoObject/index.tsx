import React, { FC, memo } from 'react'
import imageStyles from './img.module.css'

interface PhotoObjectProps {
    image: string
}

const PhotoObject: FC<PhotoObjectProps> = ({ image }) => {
    return (
        <div className={imageStyles.container}>
            <img className={imageStyles.img} src={image} alt="" />
        </div>
    )
}

export default memo(PhotoObject)