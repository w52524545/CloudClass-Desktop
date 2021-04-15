import { SceneStore } from '@/stores/app/scene'
import { Aside } from '@/ui-kit/components'
import { Story } from '@storybook/react'
import { makeAutoObservable } from 'mobx';
import { useState } from 'react';
import { RoomChat } from '.'
import { RoomChatModel, RoomChatUIKitStore } from './store'

export default {
  title: 'Capabilities/Chat'
}

class RoomChatMockStore extends RoomChatUIKitStore {

  constructor(payload: RoomChatModel = defaultModel) {
    super(payload)
    makeAutoObservable(this)
  }

  async handleSendText(): Promise<void> {
    
  }
  refreshMessageList(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  toggleMinimize(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

const defaultModel: RoomChatModel = {
  uid: '',
  collapse: false,
  canChatting: false,
  isHost: false,
  messages: [],
  chatText: '',
  unreadCount: 0,
}

export const RoomChatStory: Story<RoomChatModel> = () => {

  const [store] = useState<RoomChatMockStore>(() => new RoomChatMockStore(defaultModel))

  return (
    <Aside className='layout-aside-normal'>
      <RoomChat store={store}></RoomChat>
    </Aside>
  )
}