import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FailmodeList = () => {
    const [failmodes, setFailmode] = useState([])
    const gridRef = useRef(null);
    //const [a, setA] = React.useState(1)
    const [addFailmode, setAddFailmode] = useState({
        failModeName: "",
        failCode: "",
    })

    useEffect(() => {
        console.log(failmodes)
        axios.get('http://127.0.0.1:5000/failmodes')
            .then(res => {
                const respFailmodes = res.data.resp.response
                const statusFlag = res.data.resp.msg
                if (statusFlag === "done") {
                    const data = respFailmodes.map((currentData, index) => {
                        return {
                            failModeId: currentData[0],
                            failModeName: currentData[1],
                            failCode: currentData[2],
                        }
                    })
                    console.log(data)
                    setFailmode(data)
                } else {
                    alert("failed")
                }

            })

    }, [])


    const handleAddFailmode = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFailmodeData = {...addFailmode}
        newFailmodeData[fieldName] = fieldValue

        setAddFailmode(newFailmodeData)
    }

    const handleAddFailmodeSubmit = (event) => {
        event.preventDefault()
        const newFailmode = {
            // id: nanoid(),
            // id: addStudent.id,
            failModeName: addFailmode.failModeName,
            failCode: addFailmode.failCode,
        }

        axios.post('http://127.0.0.1:5000/addFailmode', newFailmode)
            .then(res => {
                console.log(res)
                const respFailmode = res.data.resp.response
                const data = respFailmode.map((currentData, index) => {
                    return {
                        failModeId: currentData[0],
                        failModeName: currentData[1],
                        failCode: currentData[2],
                    }
                })
                setFailmode(data)
            })
    }


    const onDataDelete = (e) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedIDs = selectedNodes.map((node) => {
            return node.data.failModeId
        })
        console.log(selectedIDs, selectedNodes)
        axios.post('http://127.0.0.1:5000/removeFailmode', {
            deletedID: selectedIDs[0]
        })
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        failModeId: currentData[0],
                        failModeName: currentData[1],
                        failCode: currentData[2],
                    }
                })
                setFailmode(data)
            })

    }

    const onDataUpdate = (event) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedIDs = selectedNodes.map((node) => {
            return node.data.failModeId
        })
        const selectedName = selectedNodes.map((node) => {
            return node.data.failModeName
        })
        const selectedCode = selectedNodes.map((node) => {
            return node.data.failCode
        })
        console.log(selectedIDs, selectedNodes)
        axios.post('http://127.0.0.1:5000/updateFailmode', {
            updatedID: selectedIDs[0],
            updatedName: selectedName[0],
            updatedCode: selectedCode[0]
        })
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        failModeId: currentData[0],
                        failModeName: currentData[1],
                        failCode: currentData[2],
                    }
                })
                setFailmode(data)
            })


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

        <div className="ag-theme-alpine" style={{height: 400, width: 605}}>
            {/*<button onClick={onButtonClick}>Add Student</button>*/}
            {/*<span>*/}
            {/*    <button onClick="window.location.href = 'http://127.0.0.1:5000/create'">*/}
            {/*    add*/}
            {/*    </button>*/}
            {/*</span>*/}
            <h2>Fail Modes</h2>
            <Button variant="text" onClick={() => {
                onDataDelete()
            }}>Delete</Button>
            <AgGridReact
                ref={gridRef}
                // ref={gridRef}
                //students={students.map((element) => {return element})}

                rowData={failmodes}
                onCellValueChanged={
                    (event) => {
                        console.log(event)
                        onDataUpdate(event)
                    }
                }

                rowSelection="multiple">
                <AgGridColumn field="failModeId" checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="failModeName" editable={true}></AgGridColumn>
                <AgGridColumn field="failCode" editable={true}></AgGridColumn>
            </AgGridReact>

            <h2>Add a Fail Mode</h2>
            <form onSubmit={handleAddFailmodeSubmit}>
                <TextField
                    name="failModeName"
                    label="failModeName"
                    onChange={handleAddFailmode}
                />
                <TextField
                    name="failCode"
                    label="failCode"
                    onChange={handleAddFailmode}
                />

                <button type="submit">Add</button>
            </form>
        </div>


    )

}

export default FailmodeList