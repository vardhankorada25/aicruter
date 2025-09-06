import React from 'react';
import CandidateFeedbackDialog from './CandidateFeedbackDialog'
import moment from 'moment';

function CandidateList({ candidateList }) {
  return (
    <div className='p-5'>
      <h2 className='font-bold my-5'>
        Candidates {candidateList?.length}
      </h2>
      {candidateList?.map((candidate, index) => (
        <div key={index} className='p-5 flex gap-3 justify-between items-center rounded-lg'>
          <div className='flex items-center gap-5'>
            <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>
              {candidate.userName?.[0] || ''}
            </h2>
            <div>
              <h2 className='font-bold'>{candidate?.userName}</h2>
              <h2 className='text-sm text-gray-500'>
                Completed On: {moment(candidate.created_at).format('MMM DD, YYYY')}
              </h2>
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <h2 className='text-green-600'>6/10</h2>
             <CandidateFeedbackDialog  candidate={candidate}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
