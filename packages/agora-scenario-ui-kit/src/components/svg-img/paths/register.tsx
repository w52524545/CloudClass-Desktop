import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) =>
    <g fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3125 7C13.414 7 11.875 8.53902 11.875 10.4375C11.875 12.336 13.414 13.875 15.3125 13.875C17.211 13.875 18.75 12.336 18.75 10.4375C18.75 8.53902 17.211 7 15.3125 7ZM13.822 15.125C12.4015 15.125 11.25 16.2765 11.25 17.697V18.6427C11.25 19.1162 11.6338 19.5 12.1073 19.5H19.1427C19.6162 19.5 20 19.1162 20 18.6427V17.697C20 16.2765 18.8485 15.125 17.428 15.125H13.822Z" fill={props.iconPrimary} fill-opacity="0.7" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4.5C6.58375 4.5 4.625 6.45875 4.625 8.875C4.625 11.2912 6.58375 13.25 9 13.25C11.4162 13.25 13.375 11.2912 13.375 8.875V5.125C13.375 4.77982 13.0952 4.5 12.75 4.5H9ZM7.02586 14.5C5.35472 14.5 4 15.8547 4 17.5259V18.4914C4 19.0484 4.45158 19.5 5.00862 19.5H12.9914C13.5484 19.5 14 19.0484 14 18.4914V17.5259C14 15.8547 12.6453 14.5 10.9741 14.5H7.02586Z" fill={props.iconPrimary} />
    </g>


export const viewBox = '0 0 24 24';