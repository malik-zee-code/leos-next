export default function SalesManagersTable() {
  const rows = Array.from({ length: 6 }).map(() => ({
    manager: "Abdul samad johar",
    achieved: "AED 17,856,007",
    target: "AED 17,856,007",
    percentage: "100%",
  }));
  return (
    <div className="overflow-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-gray-700 dark:text-gray-300">
          <tr>
            <th>Sales Manager</th>
            <th>Achieved</th>
            <th>Target</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 dark:text-gray-100">
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-gray-100 dark:border-gray-700">
              <td className="py-2">{r.manager}</td>
              <td>{r.achieved}</td>
              <td>{r.target}</td>
              <td>{r.percentage}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>Grand Total</th>
            <th>15,400,000</th>
            <th>15,400,000</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
