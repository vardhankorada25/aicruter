import React from 'react'

function QuestionListContainer({questionsList}) {
  return (
    <div>   
        <h2 className="font-bold mb-5">Generated Questions</h2>
      <div className="p-5 border border-gray-300 rounded-xl bg-white mb-3">
        {questionsList.map((item, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-xl mb-3">
            <h2>{item.question}</h2>
            <h2 className="text-sm text-primary">Type: {item?.type}</h2>
          </div>
        ))}
      </div>
 

    </div>
  )
}

export default QuestionListContainer