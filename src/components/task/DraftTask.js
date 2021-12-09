import { useEffect, useState } from 'react';
import { useUserState } from '../../context/user/UserProvider';
import Task from './Task';

const DraftTask = ({ draftChange }) => {
    const { user } = useUserState();
    const draftName = 'draft-task' + user.data.id;
    const [draft, setDraft] = useState(localStorage.getItem(draftName));

    useEffect(() => {
        setDraft(JSON.parse(localStorage.getItem(draftName)));
    }, [draftChange, draftName]);

    return draft && user.data.id && <Task task={draft} draft={true} />;
};

export default DraftTask;
