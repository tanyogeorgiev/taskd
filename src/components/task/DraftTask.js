import { useCallback, useEffect, useState } from 'react';
import { useUserState } from '../../context/user/UserProvider';
import Task from './Task';

const DraftTask = ({ draftChange }) => {
    const { user } = useUserState();
    const draftName = 'draft-task' + user.data.id;

    const getDraftIfValid = useCallback(() => {
        let draftFromLocalStorage = localStorage.getItem(draftName);
        if (
            draftFromLocalStorage &&
            draftFromLocalStorage !== undefined &&
            draftFromLocalStorage !== 'undefined'
        ) {
            return JSON.parse(draftFromLocalStorage);
        }
        return null;
    }, [draftName]);

    const [draft, setDraft] = useState(getDraftIfValid());

    useEffect(() => {
        setDraft(getDraftIfValid);
    }, [draftChange, getDraftIfValid]);

    const onAddModalClose = () => {
        setDraft(getDraftIfValid());
    };
    return (
        <>
            {draft && user.data.id && (
                <Task task={draft} draft={true} onAddModalClose={onAddModalClose} />
            )}
        </>
    );
};

export default DraftTask;
