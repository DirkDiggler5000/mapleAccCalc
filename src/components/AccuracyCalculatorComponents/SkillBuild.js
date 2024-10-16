import { useMemo, useState } from 'react'
import classSkills from '../../data/skills/class_skills.json'

function SkillBuild({
    classType
}) {
    const [selectedThirdJob, selectedThirdJobOnChange] = useState({});

    const thirdJobs = [
        {
            'id': 1,
            'jobName': 'Crusader',
            'associatedClassIds': [
                2,
                11,
                9
            ]
        },
        {
            'id': 2,
            'jobName': 'Knight',
            'associatedClassIds': [
                2,
                19,
                18
            ]
        },
        {
            'id': 3,
            'jobName': 'Dragon Knight',
            'associatedClassIds': [
                2,
                24,
                10
            ]
        },
        {
            'id': 4,
            'jobName': 'Mage(F/P)',
            'associatedClassIds': [
                1,
                12,
                13
            ]
        },
        {
            'id': 5,
            'jobName': 'Mage(I/L)',
            'associatedClassIds': [
                1,
                16,
                17
            ]
        },
        {
            'id': 6,
            'jobName': 'Priest',
            'associatedClassIds': [
                1,
                7,
                20
            ]
        },
        {
            'id': 7,
            'jobName': 'Ranger',
            'associatedClassIds': [
                5,
                15,
                21
            ]
        },
        {
            'id': 8,
            'jobName': 'Sniper',
            'associatedClassIds': [
                5,
                8,
                23
            ]
        },
        {
            'id': 9,
            'jobName': 'Hermit',
            'associatedClassIds': [
                22,
                3,
                14
            ]
        },
        {
            'id': 10,
            'jobName': 'Chief Bandit',
            'associatedClassIds': [
                22,
                4,
                6
            ]
        }
    ]

    const firstJobSkills = useMemo(() => {
        if (selectedThirdJob['associatedClassIds']) {
            const firstJobSkills = classSkills.filter((classSkill) =>
                selectedThirdJob['associatedClassIds'].some((associatedId) => associatedId === classSkill.classId)
            );

            return firstJobSkills['skills'];
        }
    })

    return (
        <div>
            <div className="row">
                <strong>Select 3rd Job:</strong>
                <select value={selectedThirdJob} onChange={(event) => { selectedThirdJobOnChange(event.target.value) }}>
                    {thirdJobs.map(thirdJob => (
                        <option key={thirdJob.id} value={thirdJob}>{thirdJob.jobName}</option>
                    ))}
                </select>
            </div>

            <div className="row">                
                    {/* {firstJobSkills.map(skill => (
                        <table key={skill.}></table>
                    ))}                 */}
            </div>
        </div>
    )
}

export default SkillBuild