import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MappingList = () => {
    const [mappings, setMapping] = useState([])
    const gridRef = useRef(null);
    //const [a, setA] = React.useState(1)
    const [addMapping, setAddMapping] = useState({
        failCode: "",
        component: "",
        failMode: "",

    })

    useEffect(() => {
        console.log(mappings)
        axios.get('http://127.0.0.1:5000/mappings')
            .then(res => {
                const respMappings = res.data.resp.response
                const statusFlag = res.data.resp.msg
                if (statusFlag === "done") {
                    const data = respMappings.map((currentData, index) => {
                        return {
                            mappingId: currentData[0],
                            failCode: currentData[1],
                            component: currentData[2],
                            failMode: currentData[3],
                        }
                    })
                    console.log(data)
                    setMapping(data)
                } else {
                    alert("failed")
                }

            })

    }, [])


    const handleAddMapping = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newMappingData = {...addMapping}
        newMappingData[fieldName] = fieldValue

        setAddMapping(newMappingData)
    }

    const handleAddMappingSubmit = (event) => {
        event.preventDefault()
        const newMapping = {
            // id: nanoid(),
            // id: addStudent.id,
            failCode: addMapping.failCode,
            component: addMapping.component,
            failMode: addMapping.failMode,
        }

        axios.post('http://127.0.0.1:5000/addMapping', newMapping)
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        mappingId: currentData[0],
                        failCode: currentData[1],
                        component: currentData[2],
                        failMode: currentData[3],
                    }
                })
                setMapping(data)
            })
    }
    const onDataUpdate = (e) => {

    }

    const onDataDelete = (e) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedIDs = selectedNodes.map((node)=>{
            return node.data.mappingId
        })
        console.log(selectedIDs, selectedNodes)
        axios.post('http://127.0.0.1:5000/removeMapping', {
            deletedID: selectedIDs[0]
        })
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        mappingId: currentData[0],
                        failCode: currentData[1],
                        component: currentData[2],
                        failMode: currentData[3],
                    }
                })
                setMapping(data)
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


        <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <h2>Mappings</h2>
            {/*<button onClick={onButtonClick}>Add Student</button>*/}
            {/*<span>*/}
            {/*    <button onClick="window.location.href = 'http://127.0.0.1:5000/create'">*/}
            {/*    add*/}
            {/*    </button>*/}
            {/*</span>*/}
            <Button variant="text" onClick={()=>{
                    onDataDelete()
                }}>Delete</Button>
            <AgGridReact
                ref={gridRef}
                //students={students.map((element) => {return element})}

                rowData={mappings}
                onCellValueChanged={
                    (event) => {
                        console.log(event)
                        onDataUpdate(event)
                    }
                }

                rowSelection="multiple">
                <AgGridColumn field="mappingId" checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="failCode" editable={true}></AgGridColumn>
                <AgGridColumn field="component" editable={true}></AgGridColumn>
                <AgGridColumn field="failMode" editable={true}></AgGridColumn>
            </AgGridReact>

            <h2>Add a Mapping</h2>
            <form onSubmit={handleAddMappingSubmit}>
                <TextField
                    label="FailCode"
                    onChange={handleAddMapping}
                />
                <TextField
                    label="component"
                    onChange={handleAddMapping}
                />
                <TextField
                    label="failMode"
                    onChange={handleAddMapping}
                />

                {/*<input*/}
                {/*    type="text"*/}
                {/*    name="failCode"*/}
                {/*    required="required"*/}
                {/*    placeholder="Enter a Fail Code..."*/}
                {/*    onChange={handleAddMapping}*/}
                {/*/>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    name="component"*/}
                {/*    required="required"*/}
                {/*    placeholder="Enter a Component..."*/}
                {/*    onChange={handleAddMapping}*/}
                {/*/>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    name="failMode"*/}
                {/*    required="required"*/}
                {/*    placeholder="Enter a Fail Mode..."*/}
                {/*    onChange={handleAddMapping}*/}
                {/*/>*/}

                <button type="submit">Add</button>
            </form>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >



            </Box>
        </div>


    )

}

export default MappingList