import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./Columns.js";
import "./Table.css";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";



function TableComponent({file}) {
  const [speechText, setSpeechText] = useState( '');
  const [excel, setExcel]= useState(MOCK_DATA)
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => excel, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const { speak, cancel } = useSpeechSynthesis();

  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    // MOCK_DATA.toString
    setExcel(file)
  }, []);

  const handleSpeak = () => {
    if (speechText) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (voices.length > 0) {
        utterance.voice = voices[2];
      }
      speak(utterance);
    }
  };
  const handleSpeakMale = () => {
    if (speechText) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (voices.length > 0) {
        utterance.voice = voices[1];
      }
      speak(utterance);
    }
  };
  const handleStop = () => {
    cancel();
  };

  return (

<>


    <div style={{ textAlign: "center" }}>
      <button onClick={handleSpeak} className="speakButton">
        Female
      </button>
      <button onClick={handleSpeakMale} className="speakButton2">
        Male
      </button>
      <button onClick={handleStop} className="StopButton">
        Stop
      </button>

      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default TableComponent;
