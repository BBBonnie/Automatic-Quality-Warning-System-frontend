import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ComponentList = () => {
    const [components, setComponent] = useState([])
    const gridRef = useRef(null);
    // const valueRef = useRef('')
    //const [a, setA] = React.useState(1)
    const [addComponent, setAddComponent] = useState({
        componentName: "",
        componentContact: "",
        componentManufacturer: "",
        componentFailureRate: "",
        componentPrice: "",
        componentQuantity: "",
    })

    useEffect(() => {
        console.log(components)
        axios.get('http://127.0.0.1:5000/components?is_sorted=true')
            .then(res => {
                const respComponents = res.data.resp.response
                const statusFlag = res.data.resp.msg
                if (statusFlag === "done") {
                    const data = respComponents.map((currentData, index) => {
                        return {
                            componentId: currentData[0],
                            componentName: currentData[1],
                            componentContact: currentData[2],
                            componentManufacturer: currentData[3],
                            componentFailureRate: currentData[4],
                            componentPrice: currentData[5],
                            componentQuantity: currentData[6]
                        }
                    })
                    console.log(data)
                    setComponent(data)
                } else {
                    alert("failed")
                }

            })

    }, [])


    const handleAddComponent = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newComponentData = {...addComponent}
        newComponentData[fieldName] = fieldValue

        setAddComponent(newComponentData)
    }

    const handleAddComponentSubmit = (event) => {
        event.preventDefault()
        const newComponent = {
            // id: nanoid(),
            // id: addStudent.id,
            componentName: addComponent.componentName,
            componentContact: addComponent.componentContact,
            componentManufacturer: addComponent.componentManufacturer,
            componentFailureRate: addComponent.componentFailureRate,
            componentPrice: addComponent.componentPrice,
            componentQuantity: addComponent.componentQuantity,
        }

        axios.post('http://127.0.0.1:5000/addComponent', newComponent)
            .then(res => {
                console.log(res)
                const respComponents = res.data.resp.response
                const data = respComponents.map((currentData, index) => {
                    return {
                        componentId: currentData[0],
                        componentName: currentData[1],
                        componentContact: currentData[2],
                        componentManufacturer: currentData[3],
                        componentFailureRate: currentData[4],
                        componentPrice: currentData[5],
                        componentQuantity: currentData[6]
                    }
                })
                setComponent(data)
            })
    }


    const onDataUpdate = (event) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedIDs = selectedNodes.map((node) => {
            return node.data.componentId
        })
        const selectedName = selectedNodes.map((node) => {
            return node.data.componentName
        })
        const selectedContact = selectedNodes.map((node) => {
            return node.data.componentContact
        })
        const selectedManufacturer = selectedNodes.map((node) => {
            return node.data.componentManufacturer
        })
        const selectedFailureRate = selectedNodes.map((node) => {
            return node.data.componentFailureRate
        })
        const selectedPrice = selectedNodes.map((node) => {
            return node.data.componentPrice
        })
        const selectedQuantity = selectedNodes.map((node) => {
            return node.data.componentQuantity
        })
        console.log(selectedIDs, selectedNodes)
        axios.post('http://127.0.0.1:5000/updateComponent', {
            updatedID: selectedIDs[0],
            updatedName: selectedName[0],
            updatedContact: selectedContact[0],
            updatedManu: selectedManufacturer[0],
            updatedFR: selectedFailureRate[0],
            updatedPrice: selectedPrice[0],
            updatedQuantity: selectedQuantity[0]
        })
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        componentID: currentData[0],
                        componentName: currentData[1],
                        componentContact: currentData[2],
                        componentManufacturer: currentData[3],
                        componentFailureRate: currentData[4],
                        componentPrice: currentData[5],
                        componentQuantity: currentData[6]
                    }
                })
                setComponent(data)
            })

    }

    const onDataDelete = (e) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedIDs = selectedNodes.map((node) => {
            return node.data.componentId
        })
        console.log(selectedIDs, selectedNodes)
        axios.post('http://127.0.0.1:5000/removeComponent', {
            deletedID: selectedIDs[0]
        })
            .then(res => {
                console.log(res)
                const respMappings = res.data.resp.response
                const data = respMappings.map((currentData, index) => {
                    return {
                        componentId: currentData[0],
                        componentName: currentData[1],
                        componentContact: currentData[2],
                        componentManufacturer: currentData[3],
                        componentFailureRate: currentData[4],
                        componentPrice: currentData[5],
                        componentQuantity: currentData[6]
                    }
                })
                setComponent(data)
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

        <div className="ag-theme-alpine" style={{height: 400, width: 1400}}>
            {/*<button onClick={onButtonClick}>Add Student</button>*/}
            {/*<span>*/}
            {/*    <button onClick="window.location.href = 'http://127.0.0.1:5000/create'">*/}
            {/*    add*/}
            {/*    </button>*/}
            {/*</span>*/}
            <h2>Components</h2>
            <Button variant="text" onClick={() => {
                onDataDelete()
            }}>Delete</Button>
            <AgGridReact
                ref={gridRef}
                //students={students.map((element) => {return element})}

                rowData={components}
                onCellValueChanged={
                    (event) => {
                        console.log(event)
                        onDataUpdate(event)
                    }
                }

                rowSelection="multiple">
                <AgGridColumn field="componentId" checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="componentName" editable={true}></AgGridColumn>
                <AgGridColumn field="componentContact" editable={true}></AgGridColumn>
                <AgGridColumn field="componentManufacturer" editable={true}></AgGridColumn>
                <AgGridColumn field="componentFailureRate" editable={true}></AgGridColumn>
                <AgGridColumn field="componentPrice" editable={true}></AgGridColumn>
                <AgGridColumn field="componentQuantity" editable={true}></AgGridColumn>
            </AgGridReact>

            <h2>Add a Component</h2>
            <form onSubmit={handleAddComponentSubmit}>
                <TextField
                    name="componentName"
                    label="componentName"
                    // value={this.state.componentName}
                    // inputRef={valueRef}
                    onChange={handleAddComponent}

                />
                <TextField
                    name="componentContact"
                    label="componentContact"
                    onChange={handleAddComponent}
                />
                <TextField
                    name="componentManufacturer"
                    label="componentManufacturer"
                    onChange={handleAddComponent}
                />
                <TextField
                    name="componentFailureRate"
                    label="componentFailureRate"
                    onChange={handleAddComponent}
                />
                <TextField
                    name="componentPrice"
                    label="componentPrice"
                    onChange={handleAddComponent}
                />
                <TextField
                    name="componentQuantity"
                    label="componentQuantity"
                    onChange={handleAddComponent}
                />


                <button type="submit">Add</button>
            </form>
        </div>


    )

}

export default ComponentList