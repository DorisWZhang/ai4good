import React, { useState } from 'react';
import "../styles/PainQuestion.css";
import { useNavigate } from 'react-router-dom';

function PainQuestion() {
    const [formData, setFormData] = useState({
        physicalPain: '',
        painLevel: '',
        painDuration: ''
    });

    const navigate = useNavigate();

    const handleButtonClick = (question, answer) => {
        setFormData(prevState => ({
            ...prevState,
            [question]: prevState[question] === answer ? '' : answer
        }));
    };
    const handleContinueClick = () => {
        console.log(formData);
        fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/results', { state: { data } });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='question-screen'>
            <div className='frame'>
                <button className='back' onClick={handleBackClick}>Back</button>
                <div className='row1'>
                    <div>Have you recently experienced physical pain?</div>
                    <div>
                        <button
                            className={`pain-button ${formData.physicalPain === 'Yes' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('physicalPain', 'Yes')}
                        >
                            Yes
                        </button>
                        <button
                            className={`pain-button ${formData.physicalPain === 'No' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('physicalPain', 'No')}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className='row2'>
                    <div>If yes, how would you describe your pain level?</div>
                    <div>
                        <button
                            className={`pain-button ${formData.painLevel === 'Low' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('painLevel', 'Low')}
                        >
                            Low
                        </button>
                        <button
                            className={`pain-button ${formData.painLevel === 'Moderate' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('painLevel', 'Moderate')}
                        >
                            Moderate
                        </button>
                        <button
                            className={`pain-button ${formData.painLevel === 'High' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('painLevel', 'High')}
                        >
                            High
                        </button>
                    </div>
                </div>

                <div className='row3'>
                    <div>If yes, has your pain lasted longer than 6 months?</div>
                    <div>
                        <button
                            className={`pain-button ${formData.painDuration === 'Yes' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('painDuration', 'Yes')}
                        >
                            Yes
                        </button>
                        <button
                            className={`pain-button ${formData.painDuration === 'No' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('painDuration', 'No')}
                        >
                            No
                        </button>
                    </div>
                </div>
            
                <div className='button-frame'>
                    <button className='continue-button' onClick={handleContinueClick}>
                        {'View Results'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PainQuestion;
