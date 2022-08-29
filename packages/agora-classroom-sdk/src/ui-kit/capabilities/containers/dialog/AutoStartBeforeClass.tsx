import { observer } from 'mobx-react';
import { useStore } from '@/infra/hooks/ui-store';
import { Button, Modal, transI18n } from '~ui-kit';
import { BaseDialogProps } from '.';

export const AutoStartBeforeClass: React.FC<
  BaseDialogProps & { onOk: () => void; onCancel: () => void; showOption: boolean }
> = observer(({ id, onOk, onCancel, showOption }) => {
  const { shareUIStore } = useStore();

  const { removeDialog } = shareUIStore;

  return (
    <Modal
      style={{ width: 300 }}
      title={'禁止操作！'}
      onOk={() => {
        onOk();
        removeDialog(id);
      }}
      onCancel={() => {
        onCancel();
        removeDialog(id);
      }}
      footer={[
        <Button key="cancel" type={'secondary'} action="cancel">
          {transI18n('toast.cancel')}
        </Button>,
        <Button key="ok" type={'primary'} action="ok">
          {transI18n('toast.confirm')}
        </Button>,
      ]}>
      {showOption
        ? transI18n('toast.AutoStartBeforeClass')
        : transI18n('toast.CallTeacherBeforeClass')}
    </Modal>
  );
});
