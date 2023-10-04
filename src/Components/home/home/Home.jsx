import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import Table from '../../Table'
import './home.css';
import { Box } from '@chakra-ui/react';

const Home = () => {
    const [zoneHover, setZoneHover] = useState(false);

    // on change states
    const [excelFile, setExcelFile] = useState(null);
    // it will contain array of objects const [excelHeaders, setExcelHeaders] = useState(null);
    const [excelHeaders, setExcelHeaders] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            setExcelFileError('Please select any file.');
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);

        fileReader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const headers = Object.keys(jsonData[0]);

            // console.log(headers)
            setExcelHeaders(headers)
            setExcelData(JSON.stringify(jsonData, null, 2));
            setExcelFileError(null);
        };

        fileReader.onerror = () => {
            setExcelFileError('Error reading the file.');
        };
    };

    // console.log(excelData);

    return (
        <>
            <div className="outBox ">
                <Box>



                    <h2>Upload Excel file</h2>
                    <div className="main ">

                        <form className='form-group' autoComplete="off"
                        >

                            <br></br>
                            <input type='file' className='form-control'
                                accept=".xlsx,.xls"
                                onChange={handleFile} required></input>



                            {excelFileError ? <div className='text-danger'
                                style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>
                                : <p>Enter the Correct Format of Data</p>
                            }

                        </form>
                    </div>

                    <br></br>






                    {/* view file section */}


                </Box>
            </div>
            <Table
                file={excelData}
               
            />
        </>
    );
};

export default Home;
