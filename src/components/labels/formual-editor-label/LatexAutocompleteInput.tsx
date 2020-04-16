import React, {MouseEvent} from 'react';
import {EditableMathField, MathField, StaticMathField} from 'react-mathquill';

import classes from './LatexAutocompleteInput.module.scss';

export interface LatexAutocompleteInputProps {
    suggestions: string[];
    onChange: (val: string) => void;
    value: string
}

const LatexAutocompleteInput: React.FC<LatexAutocompleteInputProps> = ({suggestions = [], onChange, value}) => {
    const [userInput, setUserInput] = React.useState<string>(value);
    const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
    const [activeSuggestion, setActiveSuggestion] = React.useState<number>(0);
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>(suggestions);

    const getSuggestion = React.useCallback((suggestion: string) => {
        const lastLatexStart = userInput.lastIndexOf('\\');
        const trimmed = userInput.substring(0, lastLatexStart);

        return trimmed + suggestion;
    }, [userInput]);

    // TODO: fix bugs (suggest sets user input that triggers change that sets user input)
    const handleChange = React.useCallback((field: MathField) => {
        const rawText = field.latex();

        const lastLatexStart = rawText.lastIndexOf('\\');
        const currentLatexVal = rawText.substr(lastLatexStart).trim();
        const filtered = suggestions.filter(word => word.indexOf(currentLatexVal) > -1);

        const needSuggest = filtered.length > 1;

        onChange(rawText);
        setUserInput(rawText);
        setActiveSuggestion(0);
        setShowSuggestions(needSuggest);
        setFilteredSuggestions(filtered);
    }, [onChange, suggestions]);

    const handleSuggestionHover = (event: MouseEvent<HTMLLIElement>) => {
        setActiveSuggestion(event.currentTarget.value);
    };

    const handleSuggestionClick = React.useCallback((event: MouseEvent<HTMLLIElement>) => {
        const suggestion = getSuggestion(filteredSuggestions[event.currentTarget.value]);

        onChange(suggestion);
        setUserInput(suggestion);

        setShowSuggestions(false);
    }, [getSuggestion, onChange, filteredSuggestions]);

    const handleUpKeyPressed = React.useCallback((mathField: MathField) => {
        setActiveSuggestion(activeSug => activeSug > 0 ? activeSug - 1 : 0);
    }, []);

    const handleDownKeyPressed = React.useCallback((mathField: MathField) => {
        setActiveSuggestion(activeSug => (activeSug + 1) % filteredSuggestions.length);
    }, [filteredSuggestions]);

    let suggestionsListComponent;
    if (showSuggestions && value) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className={classes.autocomplete__suggestionsList}>
                    {filteredSuggestions.map((suggestion, i) => (
                        <li
                            value={i}
                            key={suggestion}
                            onClick={handleSuggestionClick}
                            onMouseEnter={handleSuggestionHover}
                            className={`${classes.autocomplete__suggestionsListItem} ${i === activeSuggestion ? classes.autocomplete__suggestionsListItem_active : ''}`}
                        >
                            {suggestion}
                            <StaticMathField>
                                {suggestion}
                            </StaticMathField>
                        </li>
                    ))}
                </ul>
            );

            suggestionsListComponent = (
                <div className={classes.autocomplete}>
                    {suggestionsListComponent}
                </div>
            );
        }
    }

    return (
        <>
            <EditableMathField
                latex={userInput}
                onChange={handleChange}
                config={{
                    handlers: {
                        upOutOf: handleUpKeyPressed,
                        downOutOf: handleDownKeyPressed
                    }
                }}
            />

            {suggestionsListComponent}
        </>
    );
};

export default LatexAutocompleteInput;