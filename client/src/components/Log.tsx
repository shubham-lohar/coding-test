import { useEffect, useState } from "react";
import axios from "axios";
import LogTableFilter from "../lib/LogTableFilter";

interface Log {
  text: string;
  timestamp: string;
}

const Log = () => {
  const [logs, setLogs] = useState<Log[]>([{ text: "", timestamp: "" }]);
  const [submittedLogs, setSubmittedLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/logs")
      .then((response) => {
        setSubmittedLogs(response.data);
        setFilteredLogs(response.data);
      })
      .catch((error) => console.error("Error fetching logs", error));
  }, []);

  const addLogInput = () => {
    setLogs([...logs, { text: "", timestamp: "" }]);
  };

  const deleteLog = (index: number) => {
    const newLogs = logs.filter((_, logIndex) => logIndex !== index);
    setLogs(newLogs);
  };

  const handleLogChange = (index: number, field: keyof Log, value: string) => {
    const newLogs = [...logs];
    newLogs[index][field] = value;
    setLogs(newLogs);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      for (const log of logs) {
        await axios.post("http://localhost:5000/logs", log);
      }

      const response = await axios.get("http://localhost:5000/logs");
      setSubmittedLogs(response.data);
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error posting log", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        {logs.map((log, index) => (
          <div key={index} className="p-4 flex ">
            <label className="m-4" htmlFor={`logText-${index}`}>
              Log Text:
            </label>
            <input
              className="m-2"
              type="text"
              placeholder=" Log Text"
              id={`logText-${index}`}
              value={log.text}
              onChange={(e) => handleLogChange(index, "text", e.target.value)}
            />
            <label className="m-4" htmlFor={`logTimestamp-${index}`}>
              Timestamp:
            </label>
            <input
              className="m-2"
              type="datetime-local"
              id={`logTimestamp-${index}`}
              value={log.timestamp}
              onChange={(e) =>
                handleLogChange(index, "timestamp", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => deleteLog(index)}
              className="bg-red-700 m-2"
            >
              Delete Log
            </button>
          </div>
        ))}
        <div className="p-4">
          <button
            className="bg-indigo-700	m-2	"
            type="button"
            onClick={addLogInput}
          >
            Add Log
          </button>

          <button className="bg-indigo-700		m-2		" type="submit">
            Submit Logs
          </button>
        </div>
      </form>

      <div className="mt-8">
        <LogTableFilter
          logs={submittedLogs}
          setFilteredLogs={setFilteredLogs} // Step 3: Pass logs and the setter function
        />

        <table>
          <thead>
            <tr className="p-6 ">
              <th className="p-6">Text</th>
              <th className="p-6">Timestamp</th>
            </tr>
          </thead>
          <tbody className="p-6 ">
            {filteredLogs.map(
              (
                log,
                index // Step 4: Use filtered logs for rendering rows
              ) => (
                <tr key={index}>
                  <td>{log.text}</td>
                  <td>{log.timestamp}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
