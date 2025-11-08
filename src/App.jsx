import { useState } from 'react'
import './App.css'

function App() {
  const ROWS = 10
  const COLS = 7
  
  // Initialize table data with empty cells
  const [tableData, setTableData] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  )
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('mm')

  const addWindow = () => {
    if (width && height) {
      // Find the first empty cell
      let added = false
      const newTableData = [...tableData]
      
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (!newTableData[row][col]) {
            newTableData[row][col] = {
              width: parseFloat(width),
              height: parseFloat(height),
              unit: unit,
              area: (parseFloat(width) * parseFloat(height)) / (unit === 'mm' ? 1000000 : 10000)
            }
            added = true
            break
          }
        }
        if (added) break
      }
      
      if (added) {
        setTableData(newTableData)
        setWidth('')
        setHeight('')
      } else {
        alert('Table is full! Please clear some cells first.')
      }
    }
  }

  const addWidth = () => {
    if (width) {
      // Find the first empty cell in column 1 (عرض برواز)
      let added = false
      const newTableData = [...tableData]
      
      for (let row = 0; row < ROWS; row++) {
        if (!newTableData[row][1]) {
          newTableData[row][1] = {
            width: parseFloat(width),
            height: 0,
            unit: unit,
            area: 0
          }
          // Also add to column 3 (عرض درفة) with (width - 3.2) / 2
          newTableData[row][3] = {
            width: parseFloat(width),
            height: 0,
            unit: unit,
            area: 0
          }
          // Also add to column 6 (عرض منخل) with ((width - 3.2) / 2) + 1.5
          newTableData[row][6] = {
            width: parseFloat(width),
            height: 0,
            unit: unit,
            area: 0
          }
          added = true
          break
        }
      }
      
      if (added) {
        setTableData(newTableData)
        setWidth('')
      } else {
        alert('عرض برواز column is full!')
      }
    }
  }

  const addHeight = () => {
    if (height) {
      // Find the first empty cell in column 0 (علو برواز)
      let added = false
      const newTableData = [...tableData]
      
      for (let row = 0; row < ROWS; row++) {
        if (!newTableData[row][0]) {
          newTableData[row][0] = {
            width: 0,
            height: parseFloat(height),
            unit: unit,
            area: 0
          }
          // Also add to column 2 (علو درفة) with -5.8
          newTableData[row][2] = {
            width: 0,
            height: parseFloat(height),
            unit: unit,
            area: 0
          }
          // Also add to column 4 (يو) with -3.5
          newTableData[row][4] = {
            width: 0,
            height: parseFloat(height),
            unit: unit,
            area: 0
          }
          // Also add to column 5 (علو منخل) with -4.2
          newTableData[row][5] = {
            width: 0,
            height: parseFloat(height),
            unit: unit,
            area: 0
          }
          added = true
          break
        }
      }
      
      if (added) {
        setTableData(newTableData)
        setHeight('')
      } else {
        alert('علو برواز column is full!')
      }
    }
  }

  const clearCell = (row, col) => {
    const newTableData = [...tableData]
    newTableData[row][col] = null
    setTableData(newTableData)
  }

  const clearAll = () => {
    setTableData(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))
  }

  // Calculate total area
  const totalArea = tableData.flat().filter(cell => cell !== null).reduce((sum, cell) => sum + cell.area, 0)
  const totalWindows = tableData.flat().filter(cell => cell !== null).length

  return (
    <div className="container">
      <header>
        <h1>🪟 Aluminium Window Calculator</h1>
        <p>Calculate and track window dimensions</p>
      </header>

      <div className="input-section">
        <h2>شعيرة</h2>
        <div className="input-group">
          <div className="input-field">
            <label htmlFor="height">Height</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
              min="0"
              step="0.1"
            />
          </div>

          <div className="input-field">
            <label htmlFor="unit">Unit</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </div>

          <button className="add-btn" onClick={addHeight}>
            Add Height
          </button>
        </div>

        <div className="input-group">
          <div className="input-field">
            <label htmlFor="width">Width</label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Enter width"
              min="0"
              step="0.1"
            />
          </div>

          <div className="input-field">
            <label htmlFor="unit2">Unit</label>
            <select
              id="unit2"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </div>

          <button className="add-btn" onClick={addWidth}>
            Add Width
          </button>
        </div>
      </div>

      <div className="windows-list">
        <div className="header-with-button">
          <h2>Windows Grid (10 × 8)</h2>
          <button className="clear-all-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>
        
        <div className="table-container">
          <table className="grid-table">
            <thead>
              <tr>
                <th className="row-header">رقم</th>
                {Array(COLS).fill(null).map((_, colIndex) => (
                  <th key={colIndex}>
                    {colIndex === 0 ? 'علو برواز' : colIndex === 1 ? 'عرض برواز' : colIndex === 2 ? 'علو درفة' : colIndex === 3 ? 'عرض درفة' : colIndex === 4 ? 'يو' : colIndex === 5 ? 'علو منخل' : colIndex === 6 ? 'عرض منخل' : `Col ${colIndex + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="row-header">Row {rowIndex + 1}</td>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className={cell ? 'filled-cell' : 'empty-cell'}>
                      {cell ? (
                        <div className="cell-content">
                          <div className="cell-data">
                            {colIndex === 0 ? (
                              <span className="dimension">{cell.height + 5}{cell.unit}</span>
                            ) : colIndex === 1 ? (
                              <span className="dimension">{cell.width - 3.2}{cell.unit}</span>
                            ) : colIndex === 2 ? (
                              <span className="dimension">{cell.height - 5.8}{cell.unit}</span>
                            ) : colIndex === 3 ? (
                              <span className="dimension">{((cell.width - 3.2) / 2).toFixed(2)}{cell.unit}</span>
                            ) : colIndex === 4 ? (
                              <span className="dimension">{cell.height - 3.5}{cell.unit}</span>
                            ) : colIndex === 5 ? (
                              <span className="dimension">{cell.height - 4.2}{cell.unit}</span>
                            ) : colIndex === 6 ? (
                              <span className="dimension">{(((cell.width - 3.2) / 2) + 1.5).toFixed(2)}{cell.unit}</span>
                            ) : (
                              <>
                                <span className="dimension">W: {cell.width}{cell.unit}</span>
                                <span className="dimension">H: {cell.height}{cell.unit}</span>
                                <span className="area">{cell.area.toFixed(3)} m²</span>
                              </>
                            )}
                          </div>
                          <button
                            className="clear-cell-btn"
                            onClick={() => clearCell(rowIndex, colIndex)}
                            title="Clear cell"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="empty-cell-content">—</div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="summary">
          <h3>Summary</h3>
          <p>Total Windows: <strong>{totalWindows}</strong></p>
          <p>Total Area: <strong>{totalArea.toFixed(4)} m²</strong></p>
          <p>Available Cells: <strong>{(ROWS * COLS) - totalWindows}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default App
