import classnames from 'classnames';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Layout, LayoutProps } from '~components/layout';
import { useLectureH5UIStores } from '~hooks/use-edu-stores';
import {
  RoomBigStudentStreamsH5Container,
  RoomBigTeacherStreamH5Container,
} from '~containers/stream/room-big-h5-player';
import { ChatWidgetH5 } from '~containers/widget/chat-widget';
import { EduLectureH5UIStore } from '@/infra/stores/lecture-h5';
import { WhiteboardH5Container } from '~containers/board/RoomBigH5WhiteboardContainer';
import { ScreenShareContainer } from '~containers/screen-share';
import Room from '../room';
import { useEffect } from 'react';
import { ExtAPPUntrackContainer } from '~containers/ext-app';
import { Helmet } from 'react-helmet';

require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

export const BigClassScenarioH5 = observer(() => {
  return (
    <Room>
      <Helmet>
        <title>大班课</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        <meta content="telephone=no" name="format-detection" />
      </Helmet>
      <LayoutOrientation className="flex-1 big-class-h5" style={{ height: '100vh' }}>
        <H5LayoutStudentStreamBoardContainer />
        <H5TeacherStreamChatContainer />
      </LayoutOrientation>
      <ExtAPPUntrackContainer />
    </Room>
  );
});

const LayoutOrientation: FC<LayoutProps> = observer(({ className, children, ...restProps }) => {
  const { layoutUIStore, shareUIStore } = useLectureH5UIStores();
  useEffect(() => {
    shareUIStore.addOrientationchange();
    return () => {
      shareUIStore.removeOrientationchange();
    };
  }, []);
  return (
    <Layout
      className={classnames(className)}
      direction={layoutUIStore.flexOrientationCls}
      {...restProps}>
      {children}
    </Layout>
  );
});

const H5LayoutStudentStreamBoardContainer = () => {
  return (
    <Layout className="flex-1" direction="col">
      <RoomBigStudentStreamsH5Container />
      <WhiteboardH5Container>
        <ScreenShareContainer />
      </WhiteboardH5Container>
    </Layout>
  );
};

const H5TeacherStreamChatContainer = observer(() => {
  const {
    boardUIStore: { containerH5VisibleCls },
  } = useLectureH5UIStores() as EduLectureH5UIStore;
  return (
    <Layout direction="col" className={classnames(containerH5VisibleCls)}>
      <RoomBigTeacherStreamH5Container />
      <ChatWidgetH5 />
    </Layout>
  );
});
