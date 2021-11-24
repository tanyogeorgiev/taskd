import { Link } from 'react-router-dom';
import DarkModeStatus from './DarkModeStatus';

const About = () => {
    return (
        <div>
            <h4> Version 1.0.1</h4>
            <h5>
                Current Theme mode is:
                <DarkModeStatus />
            </h5>
            <Link to="/tasks/all">View tasks.</Link>
        </div>
    );
};

export default About;
