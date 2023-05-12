const TableBody = ({ tableData, columns }) => {



    // React is awesome!
    // You can use JSX if you like
    return (
     <tbody>
      {tableData.Items.map((data) => {
       return (
        <tr key={data.id}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor] ? data[accessor] : "——";
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };


   export default TableBody;