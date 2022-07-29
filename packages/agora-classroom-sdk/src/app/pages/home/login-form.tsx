import { Field } from "@/app/components/form-field";
import { useHomeStore } from "@/infra/hooks";
import { EduRoleTypeEnum, EduRoomTypeEnum } from "agora-edu-core";
import { FC, useState } from "react";
import { Button, Layout, useI18n } from "~ui-kit";

declare const CLASSROOM_SDK_VERSION: string;


const useForm = <T extends Record<string, string>>({ initialValues, validate }: { initialValues: T | (() => T), validate: (values: T, fieldName: keyof T, onError: (field: keyof T, message: string) => void) => void }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleValidate = (fieldName: keyof T, temp: typeof errors = {}) => validate(values, fieldName, (fieldName: keyof T, message: string) => {
        temp[fieldName] = message;
    });

    return {
        values,
        errors,
        validate: () => {
            const temp = {};
            Object.keys(values).forEach((fieldName) => {
                handleValidate(fieldName, temp);
            });

            setErrors(temp);

            return !Object.keys(temp).length;
        },
        eventHandlers: (fieldName: keyof T) => ({
            onChange: (value: string) => {
                if (value === '') {
                    // const temp = { ...errors };
                    // delete temp[fieldName];
                    // setErrors(temp);
                }
                setValues({
                    ...values,
                    [fieldName]: value
                });
            },
            onBlur: () => {
                const value = values[fieldName];
                if (value === '') {
                    // const temp = { ...errors };
                    // delete temp[fieldName];
                    // setErrors(temp);
                } else {
                    const temp = { ...errors };
                    delete temp[fieldName];
                    handleValidate(fieldName, temp);
                    setErrors(temp);
                }

            },
            onKeyUp: () => {
                const temp = { ...errors };
                delete temp[fieldName];
                handleValidate(fieldName, temp);
                setErrors(temp);
            }
        })
    };
}

export const LoginForm: FC<{ onSubmit: (values: any) => void }> = ({ onSubmit }) => {
    const t = useI18n();

    const homeStore = useHomeStore();


    const scenarioOptions = [
        { text: t('home.roomType_1v1'), value: `${EduRoomTypeEnum.Room1v1Class}` },
        { text: t('home.roomType_interactiveSmallClass'), value: `${EduRoomTypeEnum.RoomSmallClass}` },
        { text: t('home.roomType_interactiveBigClass'), value: `${EduRoomTypeEnum.RoomBigClass}` },
    ];

    const roleOptions = [
        { text: t('home.role_teacher'), value: `${EduRoleTypeEnum.teacher}` },
        { text: t('home.role_student'), value: `${EduRoleTypeEnum.student}` },
        { text: t('home.role_assistant'), value: `${EduRoleTypeEnum.assistant}` },
        { text: t('home.role_audience'), value: `${EduRoleTypeEnum.invisible}` },
    ];

    const { values, errors, eventHandlers, validate } = useForm({
        initialValues: () => {
            const launchConfig = homeStore.launchConfig;
            const { roleType, roomType } = launchConfig;

            return ({
                roomName: window.__launchRoomName || launchConfig.roomName || '',
                userName: window.__launchUserName || launchConfig.userName || '',
                roleType: window.__launchRoleType || (roleType ? `${roleType}` : ''),
                roomType: window.__launchRoomType || (roomType ? `${roomType}` : '')
            })
        },
        validate: (values, fieldName, onError) => {
            switch (fieldName) {
                case 'roomName':
                    !values.roomName && onError('roomName', '房间名不能为空');
                    break;
                case 'userName':
                    !values.userName && onError('userName', '用户名不能为空');
                    break;
                case 'roleType':
                    !values.roleType && onError('roleType', '角色类型不能为空');
                    break;
                case 'roomType':
                    !values.roomType && onError('roomType', '房间类型不能为空');
                    break;
            }
        }
    });

    const { roomName, userName, roleType, roomType } = values;

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(values);
        }
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); return false }}>
            <p className='form-header text-center'>Welcome Back</p>
            <Layout className='mt-8'>
                <Field label={t('home_form_field_room')} type="text" placeholder={t('home_form_placeholder_room_name')} width={369} value={roomName} {...eventHandlers('roomName')} error={errors.roomName} />
            </Layout>
            <Layout className='mt-6 relative z-20 justify-between'>
                <Field label={t('home_form_field_name')} type="text" placeholder={t('home_form_placeholder_user_name')} width={203} value={userName} {...eventHandlers('userName')} error={errors.userName} />
                <Field label={t('home_form_field_role')} type="select" placeholder={t('home_form_placeholder_user_role')} width={149}
                    value={roleType}
                    options={roleOptions}
                    {...eventHandlers('roleType')}
                    error={errors.roleType}
                />
            </Layout>
            <Layout className='mt-6 relative z-10 justify-between'>
                <Field label={t('home_form_field_type')} type="select" placeholder={t('home_form_placeholder_room_type')} width={203} value={roomType} {...eventHandlers('roomType')} options={scenarioOptions} error={errors.roomType} />
                <Field label={t('home_form_field_duration')} type="text" placeholder='30mins' readOnly width={149} value={''} />
            </Layout>
            <Layout className='mt-8 mb-6'>
                <Button className='form-submit-button w-full' size="lg" type={"primary"} onClick={handleSubmit}>{t('home_form_submit')}</Button>
            </Layout>
            <p className='form-footer text-center mt-8 mb-0'>Version: Flexible Classroom_{CLASSROOM_SDK_VERSION}</p>
        </form>
    );
}