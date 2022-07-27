import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => <path
    fill={props.iconPrimary}
    d="M1024 841.142857v182.857143h-182.857143l182.857143-182.857143zM713.142857 237.714286a73.142857 73.142857 0 0 1 73.142857 73.142857v402.285714a73.142857 73.142857 0 0 1-73.142857 73.142857h-402.285714a73.142857 73.142857 0 0 1-73.142857-73.142857v-402.285714a73.142857 73.142857 0 0 1 73.142857-73.142857h402.285714z m0 47.542857h-402.285714a25.6 25.6 0 0 0-25.6 25.6v402.285714a25.6 25.6 0 0 0 25.6 25.6h402.285714a25.6 25.6 0 0 0 25.6-25.6v-402.285714a25.6 25.6 0 0 0-25.6-25.6z"
/>

export const viewBox = '0 0 1024 1024';