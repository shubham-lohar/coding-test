import { useState } from "react";

interface Log {
  text: string;
  timestamp: string;
}

interface Props {
  logs: Log[];
  setFilteredLogs: (logs: Log[]) => void;
}

const LogTableFilter: React.FC<Props> = ({ logs, setFilteredLogs }) => {
  const [searchString, setSearchString] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterLogs = () => {
    let filteredLogs = logs.filter(
      (log) =>
        log.text?.includes(searchString) &&
        (!startDate || new Date(log.timestamp) >= new Date(startDate)) &&
        (!endDate || new Date(log.timestamp) <= new Date(endDate))
    );

    setFilteredLogs(filteredLogs);
  };

  return (
    <div>
      <div className="flex p-4">
        <input
          className="m-2"
          type="text"
          placeholder="Search..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          className="m-2"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="m-2"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div>
          <button className="" onClick={filterLogs}>
            Filter Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogTableFilter;
