import { observer } from 'mobx-react';
import { useStore } from '@/infra/hooks/ui-store';
import { Button, Modal, transI18n } from '~ui-kit';
import { BaseDialogProps } from '.';

export const ConfirmEndClass: React.FC<BaseDialogProps & { onOk: () => void }> = observer(
  ({ id, onOk }) => {
    const { shareUIStore } = useStore();

    const { removeDialog } = shareUIStore;

    return (
      <Modal
        style={{ width: 300 }}
        title={'结束会议'}
        onOk={() => {
          onOk();
          removeDialog(id);
        }}
        onCancel={() => {
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
        {transI18n('toast.ConfirmEndClass')}
      </Modal>
    );
  },
);
