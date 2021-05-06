import { CabinetItem } from '@/ui-kit/components/toolbar/tool-cabinet'
import { useBoardContext, useAppPluginContext, IAgoraExtApp, useRoomContext } from 'agora-edu-core'
import { EduRoleTypeEnum } from 'agora-rte-sdk'
import { useCallback } from 'react'
import { Icon, t, ToolCabinet } from '~ui-kit'

export const ToolCabinetContainer = () => {

    const {
        startOrStopSharing,
        setLaserPoint,
        currentSelector,
        isShareScreen
    } = useBoardContext()

    const {
        appPlugins,
        onLaunchAppPlugin
    } = useAppPluginContext()

    const onClick = async (itemType: string) => {
        switch(itemType) {
            case 'screenShare': {
                await startOrStopSharing()
                break;
            }
            case 'laser': {
                setLaserPoint()
                break;
            }
        }
    }

    const {
        roomInfo
    } = useRoomContext()

    const getCabinetList = useCallback(() => {
        const screenShareTool: CabinetItem[] = [{
            id: 'screenShare',
            icon: <Icon type="share-screen" />,
            name: t('scaffold.screen_share'),
            disabled: isShareScreen
        }]

        const restTools: CabinetItem[] = [
            {
                id: 'laser',
                icon: <Icon type="laser-pointer" />,
                name: t('scaffold.laser_pointer'),
            },
            ...appPlugins.map((p:IAgoraExtApp) => {
                return {
                    id: p.appIdentifier,
                    icon:<Icon type="share-screen" />,
                    name: p.appName
                }
            })
        ]

        if (roomInfo.userRole === EduRoleTypeEnum.teacher) {
            return screenShareTool.concat(...restTools)
        } else {
            return restTools
        }
    }, [roomInfo.userRole, isShareScreen])

    return (
        <ToolCabinet
            value='tools'
            label={t('scaffold.tools')}
            icon='tools'
            cabinetList={getCabinetList()}
            onClick={(id: any) => {
                if(['screenShare', 'laser'].includes(id)) {
                    onClick(id)
                } else {
                    onLaunchAppPlugin(id)
                }
            }}
            activeItem={currentSelector}
        />
    )
}