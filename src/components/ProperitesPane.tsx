import * as React from 'react';

class PropertiesPane extends React.Component<{}, {}> {
  render() {
    return (
      <table className="table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Kind</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>photon.css</td>
          <td>CSS</td>
        </tr>
        <tr>
          <td>photon.css</td>
          <td>CSS</td>
        </tr>        
      </tbody>
    </table>
    );
  }
}

export default PropertiesPane;