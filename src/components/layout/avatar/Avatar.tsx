import React from 'react';
import styles from './Avatar.module.scss';

export interface AvatarProps {
    icon?: () => JSX.Element;
    name?: string;
}

// TODO: on hover show modal with user info, etc.
export const Avatar: React.FC<AvatarProps> = ({icon, name}) => {
    return (
        <a className={styles.avatar}>
            {icon
                ? icon()
                : (
                    <div className={styles.avatar__fallback}>
                        <span
                            className={styles.avatar__text}
                        >
                            {name.substr(0, 2)}
                        </span>
                    </div>
                )
            }
        </a>
    );
};

export interface AvatarImageProps {
    src: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({src}) => {
    return <img src={src} className={styles.avatar__image}/>;
};