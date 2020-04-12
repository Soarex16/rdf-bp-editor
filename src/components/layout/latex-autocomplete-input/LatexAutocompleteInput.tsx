import React, {ChangeEvent, KeyboardEvent, MouseEvent} from 'react';
import {EditableMathField, StaticMathField} from 'react-mathquill';

import styles from './LatexAutocompleteInput.module.scss';

export interface LatexAutocompleteInputProps {
    suggestions: string[];
    onChange: (val: string) => void;
    value: string
}

const LatexAutocompleteInput: React.FC<LatexAutocompleteInputProps> = ({suggestions = [], onChange, value}) => {
    const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
    const [activeSuggestion, setActiveSuggestion] = React.useState<number>(0);
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>(suggestions);

    const suggest = (suggestion: string) => {
        const lastLatexStart = value.lastIndexOf('\\');
        const trimmed = value.substring(0, lastLatexStart);
        onChange(trimmed + suggestion);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const userInput = event.target.value;

        const lastLatexStart = userInput.lastIndexOf('\\');
        const currentLatexVal = userInput.substr(lastLatexStart);
        const filtered = suggestions.filter(word => word.indexOf(currentLatexVal) > -1);
        onChange(userInput);

        setActiveSuggestion(0);
        setShowSuggestions(true);
        setFilteredSuggestions(filtered);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            console.log('enter');

            // enter
            event.preventDefault();
            setActiveSuggestion(0);
            setShowSuggestions(false);
            suggest(filteredSuggestions[activeSuggestion]);
            setActiveSuggestion(0);

        } else if (event.keyCode === 38) {
            console.log('up');

            // up arrow
            if (activeSuggestion === 0) {
                return;
            }

            event.preventDefault();
            setActiveSuggestion(activeSug => activeSug - 1);

        } else if (event.keyCode === 40) {
            console.log('down');

            // down arrow
            event.preventDefault();
            setActiveSuggestion(activeSug => (activeSug + 1) % filteredSuggestions.length)
        }
    };

    const handleSuggestionHover = (event: MouseEvent<HTMLLIElement>) => {
        setActiveSuggestion(event.currentTarget.value);
    };

    const handleSuggestionClick = (event: MouseEvent<HTMLLIElement>) => {
        setShowSuggestions(false);
        suggest(filteredSuggestions[event.currentTarget.value])
    };

    let suggestionsListComponent;
    if (showSuggestions && value) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className={styles.autocomplete__suggestionsList}>
                    {filteredSuggestions.map((suggestion, i) => (
                        <li
                            value={i}
                            key={suggestion}
                            onClick={handleSuggestionClick}
                            onMouseEnter={handleSuggestionHover}
                            className={i === activeSuggestion ? styles.autocomplete__suggestionsListItem_active : ''}
                        >
                            {suggestion}
                            <StaticMathField>
                                {suggestion}
                            </StaticMathField>
                        </li>
                    ))}
                </ul>
            )
        }
    }

    return (
        <>
            {/*<input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />*/}

            <EditableMathField
                latex={value}
                onChange={(field) => {
                    const userInput = field.text();

                    const lastLatexStart = userInput.lastIndexOf('\\');
                    const currentLatexVal = userInput.substr(lastLatexStart);
                    const filtered = suggestions.filter(word => word.indexOf(currentLatexVal) > -1);
                    onChange(userInput);

                    setActiveSuggestion(0);
                    setShowSuggestions(true);
                    setFilteredSuggestions(filtered);
                }}
            />

            {suggestionsListComponent}
        </>
    );
};

/*
* <EditableMathField
                latex={value}
                onChange={(field) => onChange(field.latex())}
            />

            <div style={{
                position: 'absolute'
            }}>
                {filteredSuggections.map(suggestion => (
                    <div>
                        {suggestion}
                        <StaticMathField>
                            {suggestion}
                        </StaticMathField>
                    </div>
                ))}
            </div>*/

export default LatexAutocompleteInput;