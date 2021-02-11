import React, { useCallback, useState } from 'react'
import {useAsync,useAsyncFn} from 'react-use';
import { TextEllipsis } from '../typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { WithIconButton } from "./control/button";
import translate from "./assets/translate.png";
import canTranslateIcon from "./assets/canTranslate.png";
import fail from "./assets/fail.png";
import { Loading } from "../loading";


export interface BubbleProps {
  userName: string,
  time: string,
  content: string,
  canTranslate: boolean,
  isSender: boolean,
  onClickTranslate: (evt?: any) => any,
  bubbleStyle?: React.CSSProperties,
  translateText?: string,
  status: 'loading' | 'fail' | 'success',
  onClickFailButton: (evt: any) => any,
}

const useStyles = makeStyles((theme: Theme) => ({
  senderHeader: {
    marginBottom: 3,
    color: '#666',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '10px',
    // justifyContent: 'space-between',
    width: 99,
  },
  senderContent: {
    display: 'flex',
    maxWidth: 260,
    padding: '9px 10px',
    border: '1px solid #dbe2e5',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    lineHeight: '28px',
    backgroundColor: "#CBCCFF",
    color: '#2D3E6D',
    boxSizing: 'border-box',
    // flexDirection: 'row-reverse',
    // justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: 8,
    borderTopRightRadius: 0,
  },
  header: {
    marginBottom: 3,
    color: '#666',
    fontSize: 12,
    display: 'flex',
    marginTop: '10px',
    // justifyContent: 'space-between',
    width: 99,
  },
  content: {
    display: 'flex',
    maxWidth: 260,
    padding: '9px 10px',
    // border: '1px solid #dbe2e5',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    lineHeight: '28px',
    color: '#2D3E6D',
    background: '#AADCF6',
    boxSizing: 'border-box',
    // justifyContent: 'space-between',
    flexDirection: 'column'
  },
  chatMessage: {
    display: 'flex',
    flexDirection: 'row'
  },
  status: {
    margin: '0 6px'
  },
  translateText: {
    borderTop: '1px solid #0000001a',
    lineHeight: '2em',
    marginTop: '3px'
  },
}))


export const Bubble = (props: BubbleProps) => {
  const { bubbleStyle, isSender, time, content, userName, canTranslate, onClickTranslate, status, onClickFailButton } = props;
  const [isShowTranslateText, setIsShowTranslateText] = useState(false)
  const [translateText, setTranslateText] = useState('')
  const [bubbleCanTrans, setBubbleCanTrans] = useState(true)
  const classes = useStyles()
  const [state, fetch] = useAsyncFn(async (data) => {
    const response = await onClickTranslate(data);
    setIsShowTranslateText(true)
    setTranslateText(response.text)
    setBubbleCanTrans(false)
    return response
  });
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isSender ? 'flex-end' : 'flex-start'
    }}>
      <div className={isSender ? classes.senderHeader : classes.header}>
        <TextEllipsis maxWidth="27" style={{ color: '#415889', margin: '0 3px' }}>
          <React.Fragment>
            {userName}
          </React.Fragment>
        </TextEllipsis>
        <TextEllipsis maxWidth="19" style={{ color: '#B8C9DE' }}>
          <React.Fragment>
            {time}
          </React.Fragment>
        </TextEllipsis>
      </div>
      <div className={classes.chatMessage} style={isSender ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }}>
        <div className={classes.status}>
          {/* {canTranslate && bubbleCanTrans ? */}
          <WithIconButton onClick={() => canTranslate && bubbleCanTrans && fetch({ ...props })} icon={canTranslate && bubbleCanTrans ? canTranslateIcon : translate} style={{ alignItems: 'flex-start', marginBottom: '5px' }} />
          {status === 'loading' && <Loading />}
          {status === 'fail' && <WithIconButton onClick={() => onClickFailButton(props)} icon={fail} iconStyle={{ width: '18px', height: '18px' }} />}
        </div>
        <div style={{ ...bubbleStyle }} className={isSender ? classes.senderContent : classes.content}>
          <div>{content}</div>
          {isShowTranslateText ? <div className={classes.translateText}>{translateText}</div> : null}
          {state.loading ? <div className={classes.translateText}><Loading />翻译中</div> : state.error ? <div className={classes.translateText}>翻译失败</div> : null}
        </div>
      </div>
    </div>
  )
}