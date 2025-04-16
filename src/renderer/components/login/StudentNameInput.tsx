import React, { useState } from 'react'
import Button from '../Button';

interface StudentNameInputProps {
  handleSaveStudentName: (name: string) => void
}

const StudentNameInput: React.FC<StudentNameInputProps> = ({
  handleSaveStudentName
}) => {

  const [studentName, setStudentName] = useState("")

  const handleSubmitStudentName = () => {
    console.log("Save Studnet Name")
    handleSaveStudentName(studentName)
  }

  return (
    <section className="flex flex-col w-full mt-8 text-text">
      <label htmlFor="studentName" className="text-base text-text mb-2">
        Name
      </label>
      <input
        type="text"
        placeholder="Enter Your Name"
        autoComplete="off"
        id="studentName"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="flex-1 outline-none text-sm border border-border rounded-md px-2.5 py-3"
      />
      <Button onClick={handleSubmitStudentName} type="primary" className='text-sm mt-6 w-full'>
        Continue
      </Button>
    </section>
  )
}

export default StudentNameInput