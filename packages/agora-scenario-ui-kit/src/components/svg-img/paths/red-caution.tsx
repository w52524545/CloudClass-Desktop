import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => <path
    fill={props.iconPrimary}
    d="M569.064727 140.753455c18.571636 10.426182 33.885091 25.786182 44.357818 44.357818l270.382546 480.674909a116.363636 116.363636 0 0 1-101.469091 173.381818H241.664a116.363636 116.363636 0 0 1-101.422545-173.381818l270.42909-480.674909a116.363636 116.363636 0 0 1 158.440728-44.357818z m-24.203636 523.636363h-69.492364v64.884364h69.538909v-64.837818z m-2.048-305.617454h-64.884364v106.914909l17.128728 160.349091h30.626909l17.128727-160.349091V358.772364z"
/>
export const viewBox = '0 0 1024 1024';