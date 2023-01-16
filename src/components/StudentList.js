import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {nanoid} from 'nanoid'


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const StudentList = () => {
    const [students, setStudent] = useState([])
    // const gridRef = useRef(null);
    //const [a, setA] = React.useState(1)
    const [addStudent, setAddStudent] = useState({
        name: "",
        age: "",
        major: ""
    })

    useEffect(() => {
        console.log(students)
        axios.get('http://127.0.0.1:5000/')
            .then(res => {
                const respStudents = res.data.resp.response
                const statusFlag = res.data.resp.msg
                if (statusFlag === "displayed") {
                    const data = respStudents.map((currentData, index) => {
                        return {
                            id: currentData[0],
                            name: currentData[1],
                            age: currentData[2],
                            major: currentData[3]
                        }
                    })
                    console.log(data)
                    setStudent(data)
                } else {
                    alert("failed")
                }

            })

    }, [])

    const handleAddStudent = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newStudentData = {...addStudent}
        newStudentData[fieldName] = fieldValue

        setAddStudent(newStudentData)
    }

    const handleAddStudentSubmit = (event) => {
        event.preventDefault()
        const newStudent = {
            // id: nanoid(),
            // id: addStudent.id,
            name: addStudent.name,
            age: addStudent.age,
            major: addStudent.major
        }


        // setStudent(newStudents)

        axios.post('http://127.0.0.1:5000/create', newStudent)
            .then(res => {
                console.log(res)
                const respStudents = res.data.resp.response
                const data = respStudents.map((currentData, index) => {
                    return {
                        id: currentData[0],
                        name: currentData[1],
                        age: currentData[2],
                        major: currentData[3]
                    }
                })
                setStudent(data)
            })
    }
    const onDataUpdate = (e) =>{

    }


    //     const onButtonClick = e => {
    //     const selectedNodes = gridRef.current.api.getSelectedNodes()
    //     const selectedData = selectedNodes.map(node => node.data)
    //     const selectedDataStringPresentation = selectedData.map(node => `${node.id} ${node.name}`).join(', ')
    //     alert(`Selected nodes: ${selectedDataStringPresentation}`)
    // }


    return (
        // students.map((element) => {
        //     return element})

        <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            {/*<button onClick={onButtonClick}>Add Student</button>*/}
            {/*<span>*/}
            {/*    <button onClick="window.location.href = 'http://127.0.0.1:5000/create'">*/}
            {/*    add*/}
            {/*    </button>*/}
            {/*</span>*/}
            <AgGridReact
                // ref={gridRef}
                //students={students.map((element) => {return element})}

                rowData={students}
                onCellValueChanged = {
                    (event) => {
                        console.log(event)
                        onDataUpdate(event)
                    }
                }

                rowSelection="multiple">
                <AgGridColumn field="id"></AgGridColumn>
                <AgGridColumn field="name" editable={true}></AgGridColumn>
                <AgGridColumn field="age" editable={true}></AgGridColumn>
                <AgGridColumn field="major" editable={true}></AgGridColumn>
            </AgGridReact>

            <h2>Add a Student</h2>
            <form onSubmit={handleAddStudentSubmit}>
                <input
                    type="text"
                    name="name"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddStudent}
                />
                <input
                    type="text"
                    name="age"
                    required="required"
                    placeholder="Enter an age..."
                    onChange={handleAddStudent}
                />
                <input
                    type="text"
                    name="major"
                    required="required"
                    placeholder="Enter a major..."
                    onChange={handleAddStudent}
                />
                <button type="submit">Add</button>
            </form>
        </div>


    )

}

export default StudentList