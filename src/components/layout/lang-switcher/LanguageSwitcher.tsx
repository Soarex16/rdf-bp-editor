import React, {useEffect, useState} from 'react';
import classes from './LanguageSwitcher.module.scss';
import {ReactComponent as IconPlus} from '../../../assets/icons/language.svg';
import {useTranslation} from 'react-i18next';

const langs = ['en', 'ru'];

// TODO: убрать зависимость от либы (пока что прибито костылями, потому что не работает)
const LanguageSwitcher: React.FC = () => {
    const [t, i18n] = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    const changeLang = () => {
        const nextIdx = (langs.indexOf(lang) + 1) % langs.length;
        setLang(langs[nextIdx]);
    };

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [i18n, lang]);

    return (
        <div className={classes.buttonContainer}>
            <button onClick={changeLang} className={classes.buttonLangSwitcher}
                    title={t('editor.buttons.langSwitcher')}>
                <IconPlus/>
            </button>
        </div>
    );
};

export default LanguageSwitcher;