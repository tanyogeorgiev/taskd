import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';

const TaskForm = (props) => {
    const { register, handleSubmit, getValues, setValue, formState, reset } = useForm();

    const isInputsEmpty = useCallback(() => {
        return (
            getValues('regInput.text') ||
            getValues('regInput.day') ||
            getValues('regInput.reminder')
        );
    }, [getValues]);

    const onCancelTask = useCallback(
        (rdr) => {
            console.log('onCancel');
            if (props.onSaveDraft) {
                if (isInputsEmpty()) {
                    props.onSaveDraft(getValues().regInput);
                }
            }

            if (rdr) {
                if (props.onCancel) {
                    reset();
                    console.log('cancel 1');
                    props.onCancel();
                }
            }
            
        },
        [props, getValues, isInputsEmpty, reset]
    );

    useEffect(() => {
        if (props.onReset) reset();
        const getTask = (data) => {
            console.log('uEffect', data);
            if (data) {
                setValue('regInput', data);
            }
        };

        getTask(props.task);
    }, [props.task, setValue, props.onReset, reset]);

    const checkImageWidth = async function () {
        let img = new Image();
        img.src = getValues('imgUrl');
        return (img.onload = function () {
            setValue('imgUrlWidth', this.width);
        });
    };
    console.log('TASK FORM', props.task);
    return (
        <>
            <form className="add-form" onSubmit={handleSubmit(props.onFormSubmit)}>
                <Stack spacing={5} paddingBottom="20px">
                    <FormControl id="first-name" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            placeholder="Title"
                            {...register('regInput.text', {
                                required: {
                                    value: true,
                                    message: 'Task name field is required',
                                },
                                maxLength: { value: 20, message: 'Max Lenght is 20' },
                            })}
                        />
                    </FormControl>
                    <FormControl id="day-time" isRequired>
                        <FormLabel>Day & Time</FormLabel>
                        <Input
                            type="datetime-local"
                            placeholder="Add Day & Time"
                            {...register('regInput.day', {
                                required: {
                                    value: true,
                                    message: 'Day field is required',
                                },
                            })}
                        />
                    </FormControl>
                    <FormControl id="img-url">
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            placeholder="Add Image URL"
                            {...register('regInput.imgUrl', {
                                validate: checkImageWidth(),
                            })}
                        />
                    </FormControl>
                    {getValues('regInput.imgUrl') && (
                        <img
                            alt="task"
                            style={{ maxWidth: '200px', clipPath: 'circle(190px at center)' }}
                            src={getValues('imgUrl')}
                        ></img>
                    )}
                    <Input
                        type="hidden"
                        {...register('regInput.imgUrlWidth', {
                            validate: (value) => value <= 1500,
                        })}
                    />
                    {formState.errors?.regInput?.text && (
                        <div style={{ color: 'red' }}>{formState.errors.regInput.text.message}</div>
                    )}
                    {formState.errors?.regInput?.day && (
                        <div style={{ color: 'red' }}>{formState.errors.regInput.day.message}</div>
                    )}
                    {formState.errors?.regInput?.imgUrl && (
                        <div style={{ color: 'red' }}>Image is required!!!!!!!</div>
                    )}
                    {formState.errors?.regInput?.imgUrlWidth && !formState.errors.imgUrl && (
                        <div style={{ color: 'red' }}>
                            Image width is Bigger than 150 px !!!!!!!
                        </div>
                    )}

                    <FormControl id="priority">
                        <FormLabel>Priority</FormLabel>
                        <RadioGroup label="Priority" defaultValue={props?.task?.priority}>
                            <Stack spacing={4} direction="row">
                                <Radio
                                    colorScheme="green"
                                    size="lg"
                                    value="1"
                                    {...register('regInput.priority')}
                                >
                                    Low
                                </Radio>
                                <Radio
                                    colorScheme="yellow"
                                    size="lg"
                                    value="2"
                                    {...register('regInput.priority')}
                                >
                                    Normal
                                </Radio>
                                <Radio
                                    colorScheme="red"
                                    size="lg"
                                    value="3"
                                    {...register('regInput.priority')}
                                >
                                    High
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <Checkbox name="reminder" type="checkbox" {...register('regInput.reminder')}>
                        Reminder
                    </Checkbox>
                    <Button type="submit">{props.submitText ? props.submitText : 'ADD'}</Button>
                </Stack>
            </form>
            <Button
                color="tomato"
                onClick={() => {
                    onCancelTask(true);
                }}
            >
                Close
            </Button>
        </>
    );
};

export default TaskForm;
