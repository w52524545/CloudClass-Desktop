import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => <g>
    <defs>
        <rect id="path-1" x="0" y="0" width="28" height="28"></rect>
    </defs>
    <g
        id="V1.1.3_举手功能/electron端—设备设置"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g id="灵动课堂Guide-举手交互备份" transform="translate(-1555.000000, -758.000000)">
            <g id="编组-35" transform="translate(1325.000000, 545.000000)">
                <g id="编组-7" transform="translate(58.000000, 7.000000)">
                    <g id="编组-7备份-6" transform="translate(0.000000, 200.000000)">
                        <g id="信息" transform="translate(16.000000, 6.000000)">
                            <g id="+" transform="translate(156.000000, 0.000000)">
                                <circle id="椭圆形备份-2" fill="#f4f4f8" cx="14" cy="14" r="13"></circle>
                                <mask id="mask-2" fill="white">
                                    <use xlinkHref="#path-1"></use>
                                </mask>
                                <use id="icon-zoomin" fill="#D8D8D8" opacity="0" xlinkHref="#path-1"></use>
                                <polygon
                                    fill={props.iconPrimary}
                                    fillRule="nonzero"
                                    mask="url(#mask-2)"
                                    transform="translate(14.000000, 14.000000) rotate(-45.000000) translate(-14.000000, -14.000000) "
                                    points="14.8095238 13.1936759 20 13.1936759 20 14.8063241 14.8095238 14.8063241 14.8095238 20 13.1904762 20 13.1904762 14.8063241 8 14.8063241 8 13.1936759 13.1904762 13.1936759 13.1904762 8 14.8095238 8"></polygon>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</g>

export const viewBox = '0 0 28 28';